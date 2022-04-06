package assignments

import (
	"context"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	pb "github.com/autograde/quickfeed/ag"
	"github.com/autograde/quickfeed/ci"
	"github.com/autograde/quickfeed/database"
	"github.com/autograde/quickfeed/scm"
	"github.com/google/go-cmp/cmp"
	"go.uber.org/zap"
	"google.golang.org/protobuf/testing/protocmp"
	"gorm.io/gorm"
)

// UpdateFromTestsRepo updates the database record for the course assignments.
func UpdateFromTestsRepo(logger *zap.SugaredLogger, db database.Database, s scm.SCM, course *pb.Course) {
	logger.Debugf("Updating %s from '%s' repository", course.GetCode(), pb.TestsRepo)
	assignments, dockerfile, err := fetchAssignments(context.Background(), logger, s, course)
	if err != nil {
		logger.Errorf("Failed to fetch assignments from '%s' repository: %v", pb.TestsRepo, err)
		return
	}
	for _, assignment := range assignments {
		updateGradingCriteria(logger, db, assignment)
	}
	if dockerfile != "" && dockerfile != course.Dockerfile {
		course.Dockerfile = dockerfile
		if err := db.UpdateCourse(course); err != nil {
			logger.Debugf("Failed to update Dockerfile for course %s: %s", course.GetCode(), err)
			return
		}
	}
	if err = db.UpdateAssignments(assignments); err != nil {
		for _, assignment := range assignments {
			logger.Debugf("Failed to update database for: %v", assignment)
		}
		logger.Errorf("Failed to update assignments in database: %v", err)
		return
	}
	logger.Debugf("Assignments for %s successfully updated from '%s' repo", course.GetCode(), pb.TestsRepo)
}

// fetchAssignments returns a list of assignments for the given course, by
// cloning the 'tests' repo for the given course and extracting the assignments
// from the 'assignment.yml' files, one for each assignment. If there is a Dockerfile
// in 'tests/script' will also return its contents.
//
// Note: This will typically be called on a push event to the 'tests' repo,
// which should happen infrequently. It may also be called manually by a
// teacher/admin from the frontend. However, even if multiple invocations
// happen concurrently, the function is idempotent. That is, it only reads
// data from GitHub, processes the yml files and returns the assignments.
// The TempDir() function ensures that cloning is done in distinct temp
// directories, should there be concurrent calls to this function.
func fetchAssignments(c context.Context, logger *zap.SugaredLogger, sc scm.SCM, course *pb.Course) ([]*pb.Assignment, string, error) {
	ctx, cancel := context.WithTimeout(c, pb.MaxWait)
	defer cancel()

	cloneURL := sc.CreateCloneURL(&scm.URLPathOptions{
		Organization: course.OrganizationPath,
		Repository:   pb.TestsRepo,
	})
	cloneDir, err := ioutil.TempDir("", pb.TestsRepo)
	if err != nil {
		return nil, "", err
	}
	defer os.RemoveAll(cloneDir)

	// clone the tests repository to cloneDir
	job := &ci.Job{
		Commands: []string{
			"cd " + cloneDir,
			"git clone " + cloneURL,
		},
	}
	logger.Debugf("cd %v", cloneDir)
	logger.Debugf("git clone %v", cloneURL)

	runner := ci.Local{}
	_, err = runner.Run(ctx, job)
	if err != nil {
		return nil, "", err
	}

	// parse assignments found in the cloned tests directory
	assignments, dockerfile, err := parseAssignments(cloneDir, course.ID)
	if err != nil {
		return nil, "", err
	}

	// if a Dockerfile added/updated, build docker image locally
	// tag the image with the course code
	if dockerfile != "" && dockerfile != course.Dockerfile {
		buildDir := filepath.Join(cloneDir, pb.TestsRepo, scriptFolder)
		buildCmd := fmt.Sprintf("docker build -t %s .", strings.ToLower(course.GetCode()))
		job.Commands = []string{
			"cd " + buildDir,
			"ls -la",
			"cat Dockerfile",
			buildCmd,
		}
		logger.Debugf("cd %v", buildDir)
		logger.Debugf(buildCmd)

		if out, err := runner.Run(context.Background(), job); err != nil {
			logger.Errorf("Failed to build image from %s's Dockerfile: %s", course.GetCode(), err)
			logger.Debug(out)
		}
	}
	return assignments, dockerfile, nil
}

// updateGradingCriteria will remove old grading criteria and related reviews when criteria.json gets updated
func updateGradingCriteria(logger *zap.SugaredLogger, db database.Database, assignment *pb.Assignment) {
	if len(assignment.GetGradingBenchmarks()) > 0 {
		gradingBenchmarks, err := db.GetBenchmarks(&pb.Assignment{
			CourseID: assignment.CourseID,
			Order:    assignment.Order,
		})
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				// a new assignment, no actions required
				return
			}
			logger.Debugf("Failed to fetch assignment %s from database: %s", assignment.Name, err)
			return
		}
		if len(gradingBenchmarks) > 0 {
			if !cmp.Equal(assignment.GradingBenchmarks, gradingBenchmarks, cmp.Options{
				protocmp.Transform(),
				protocmp.IgnoreFields(&pb.GradingBenchmark{}, "ID", "AssignmentID", "ReviewID"),
				protocmp.IgnoreFields(&pb.GradingCriterion{}, "ID", "BenchmarkID"),
				protocmp.IgnoreEnums(),
			}) {
				for _, bm := range gradingBenchmarks {
					for _, c := range bm.Criteria {
						if err := db.DeleteCriterion(c); err != nil {
							logger.Errorf("Failed to delete criteria %v: %s\n", c, err)
							return
						}
					}
					if err := db.DeleteBenchmark(bm); err != nil {
						logger.Errorf("Failed to delete benchmark %v: %s\n", bm, err)
						return
					}
				}
			} else {
				assignment.GradingBenchmarks = nil
			}
		}
	}
}
