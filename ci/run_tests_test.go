package ci_test

import (
	"context"
	"os"
	"strings"
	"testing"
	"time"

	pb "github.com/autograde/quickfeed/ag"
	"github.com/autograde/quickfeed/ci"
	"github.com/autograde/quickfeed/internal/qtest"
	"github.com/autograde/quickfeed/kit/score"
	"github.com/autograde/quickfeed/scm"
	"github.com/google/go-cmp/cmp"
	"google.golang.org/protobuf/testing/protocmp"
)

// To run this test, please see instructions in the developer guide (dev.md).

// This test uses a test course for experimenting with run.sh behavior.
// The test below will run locally on the test machine, not on the QuickFeed machine.

func loadRunScript(t *testing.T) string {
	t.Helper()
	b, err := os.ReadFile("testdata/run.sh")
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}

func testRunData(qfTestOrg, userName, accessToken, scriptTemplate string) *ci.RunData {
	repo := pb.RepoURL{ProviderURL: "github.com", Organization: qfTestOrg}
	courseID := uint64(1)
	pb.SetAccessToken(courseID, accessToken)
	runData := &ci.RunData{
		Course: &pb.Course{
			ID:   courseID,
			Code: "DAT320",
		},
		Assignment: &pb.Assignment{
			Name:             "lab1",
			ScriptFile:       scriptTemplate,
			ContainerTimeout: 1, // minutes
		},
		Repo: &pb.Repository{
			HTMLURL:  repo.StudentRepoURL(userName),
			RepoType: pb.Repository_USER,
		},
		JobOwner: "muggles",
		CommitID: "deadbeef",
	}
	return runData
}

// TODO(vera): needs update (GetUserName needs client based on a personal access token)
func TestRunTests(t *testing.T) {
	t.Skip("needs update")
	qfTestOrg := scm.GetTestOrganization(t)
	accessToken := scm.GetAccessToken(t)

	ctx := context.Background()
	s := qtest.TestSCMClient(ctx, t, qfTestOrg, "github", accessToken)
	userName, err := s.GetUserName(ctx)
	if err != nil {
		t.Fatal(err)
	}

	scriptTemplate := loadRunScript(t)
	runData := testRunData(qfTestOrg, userName, accessToken, scriptTemplate)

	runner, closeFn := dockerClient(t)
	defer closeFn()
	ctx, cancel := runData.Assignment.WithTimeout(2 * time.Minute)
	defer cancel()
	results, err := runData.RunTests(ctx, qtest.Logger(t), runner)
	if err != nil {
		t.Fatal(err)
	}
	// We don't actually test anything here since we don't know how many assignments are in QF_TEST_ORG
	t.Logf("%+v\n", results)
}

// TODO(vera): needs update (GetUserName needs client based on a personal access token)
func TestRunTestsTimeout(t *testing.T) {
	t.Skip("needs update")
	qfTestOrg := scm.GetTestOrganization(t)
	accessToken := scm.GetAccessToken(t)

	scriptTemplate := loadRunScript(t)
	runData := testRunData(qfTestOrg, "test username", accessToken, scriptTemplate)

	runner, closeFn := dockerClient(t)
	defer closeFn()
	ctx, cancel := context.WithTimeout(context.Background(), 1000*time.Millisecond)
	defer cancel()
	results, err := runData.RunTests(ctx, qtest.Logger(t), runner)
	if err != nil {
		t.Fatal(err)
	}
	const wantOut = `Container timeout. Please check for infinite loops or other slowness.`
	if results.BuildInfo != nil && !strings.HasPrefix(results.BuildInfo.BuildLog, wantOut) {
		t.Errorf("RunTests(1s timeout) = '%s', got '%s'", wantOut, results.BuildInfo.BuildLog)
	}
}

func TestRecordResults(t *testing.T) {
	db, cleanup := qtest.TestDB(t)
	defer cleanup()

	course := &pb.Course{
		Name:           "Test",
		Code:           "DAT320",
		OrganizationID: 1,
		SlipDays:       5,
	}
	admin := qtest.CreateFakeUser(t, db, 1)
	qtest.CreateCourse(t, db, admin, course)

	assignment := &pb.Assignment{
		CourseID: course.ID,
		Name:     "lab1",
		ScriptFile: `#image/quickfeed:go
printf "AssignmentName: {{ .AssignmentName }}\n"
printf "RandomSecret: {{ .RandomSecret }}\n"
`,
		Deadline:         "2022-11-11T13:00:00",
		AutoApprove:      true,
		ScoreLimit:       70,
		Order:            1,
		IsGroupLab:       false,
		ContainerTimeout: 1,
	}
	if err := db.CreateAssignment(assignment); err != nil {
		t.Fatal(err)
	}

	buildInfo := &score.BuildInfo{
		BuildDate: "2022-11-10T13:00:00",
		BuildLog:  "Testing",
		ExecTime:  33333,
	}
	testScores := []*score.Score{
		{
			Secret:   "secret",
			TestName: "Test",
			Score:    10,
			MaxScore: 15,
			Weight:   1,
		},
	}
	// Must create a new submission with correct scores and build info, not approved
	results := &score.Results{
		BuildInfo: buildInfo,
		Scores:    testScores,
	}
	runData := &ci.RunData{
		Course:     course,
		Assignment: assignment,
		Repo: &pb.Repository{
			UserID: 1,
		},
		JobOwner: "test",
		CommitID: "deadbeef",
	}

	// Check that submission is recorded correctly
	submission, err := runData.RecordResults(qtest.Logger(t), db, results)
	if err != nil {
		t.Fatal(err)
	}
	if submission.Status == pb.Submission_APPROVED {
		t.Error("Submission must not be auto approved")
	}
	if diff := cmp.Diff(testScores, submission.Scores, protocmp.Transform(), protocmp.IgnoreFields(&score.Score{}, "Secret")); diff != "" {
		t.Errorf("Incorrect submission scores. Want: %+v, got %+v", testScores, submission.Scores)
	}
	if diff := cmp.Diff(buildInfo.BuildDate, submission.BuildInfo.BuildDate); diff != "" {
		t.Errorf("Incorrect build date. Want: %s, got %s", buildInfo.BuildDate, submission.BuildInfo.BuildDate)
	}

	// When updating submission after deadline: build info and slip days must be updated
	newBuildDate := "2022-11-12T13:00:00"
	results.BuildInfo.BuildDate = newBuildDate
	updatedSubmission, err := runData.RecordResults(qtest.Logger(t), db, results)
	if err != nil {
		t.Fatal(err)
	}
	enrollment, err := db.GetEnrollmentByCourseAndUser(course.ID, admin.ID)
	if err != nil {
		t.Fatal(err)
	}
	if enrollment.RemainingSlipDays(course) == int32(course.SlipDays) || len(enrollment.UsedSlipDays) < 1 {
		t.Error("Student must have reduced slip days")
	}
	if updatedSubmission.BuildInfo.BuildDate != newBuildDate {
		t.Errorf("Incorrect build date: want %s, got %s", newBuildDate, updatedSubmission.BuildInfo.BuildDate)
	}

	// When rebuilding after deadline: delivery date and slip days must stay unchanged
	runData.Rebuild = true
	results.BuildInfo.BuildDate = "2022-11-13T13:00:00"
	slipDaysBeforeUpdate := enrollment.RemainingSlipDays(course)
	submission, err = runData.RecordResults(qtest.Logger(t), db, results)
	if err != nil {
		t.Fatal(err)
	}
	if submission.BuildInfo.BuildDate != newBuildDate {
		t.Errorf("Incorrect build date: want %s, got %s", newBuildDate, submission.BuildInfo.BuildDate)
	}
	updatedEnrollment, err := db.GetEnrollmentByCourseAndUser(course.ID, admin.ID)
	if err != nil {
		t.Fatal(err)
	}
	if updatedEnrollment.RemainingSlipDays(course) != slipDaysBeforeUpdate {
		t.Errorf("Incorrect number of slip days: expected %d, got %d", slipDaysBeforeUpdate, updatedEnrollment.RemainingSlipDays(course))
	}
}

func TestRecordResultsForManualReview(t *testing.T) {
	db, cleanup := qtest.TestDB(t)
	defer cleanup()

	course := &pb.Course{
		Name:           "Test",
		OrganizationID: 1,
		SlipDays:       5,
	}
	admin := qtest.CreateFakeUser(t, db, 1)
	qtest.CreateCourse(t, db, admin, course)

	assignment := &pb.Assignment{
		Order:      1,
		CourseID:   course.ID,
		Name:       "assignment-1",
		Deadline:   "2022-11-11T13:00:00",
		IsGroupLab: false,
		Reviewers:  1,
	}
	if err := db.CreateAssignment(assignment); err != nil {
		t.Fatal(err)
	}

	initialSubmission := &pb.Submission{
		AssignmentID: assignment.ID,
		UserID:       admin.ID,
		Score:        80,
		Status:       pb.Submission_APPROVED,
		Released:     true,
	}
	if err := db.CreateSubmission(initialSubmission); err != nil {
		t.Fatal(err)
	}

	runData := &ci.RunData{
		Course:     course,
		Assignment: assignment,
		Repo: &pb.Repository{
			UserID: 1,
		},
		JobOwner: "test",
	}

	submission, err := runData.RecordResults(qtest.Logger(t), db, nil)
	if err != nil {
		t.Fatal(err)
	}

	// make sure all fields were saved correctly in the database
	query := &pb.Submission{
		AssignmentID: assignment.ID,
		UserID:       admin.ID,
	}
	updatedSubmission, err := db.GetSubmission(query)
	if err != nil {
		t.Fatal(err)
	}

	if diff := cmp.Diff(updatedSubmission, submission, protocmp.Transform()); diff != "" {
		t.Errorf("Incorrect submission fields in the database. Want: %+v, got %+v", initialSubmission, updatedSubmission)
	}

	// submission must stay approved, released, with score = 80
	if diff := cmp.Diff(initialSubmission, updatedSubmission, protocmp.Transform(), protocmp.IgnoreFields(&pb.Submission{}, "BuildInfo", "Scores")); diff != "" {
		t.Errorf("Incorrect submission after update. Want: %+v, got %+v", initialSubmission, updatedSubmission)
	}
}
