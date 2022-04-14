package qtest

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"io/ioutil"
	"os"
	"strconv"
	"testing"

	pb "github.com/autograde/quickfeed/ag"
	"github.com/autograde/quickfeed/database"
	"github.com/autograde/quickfeed/log"
	"github.com/autograde/quickfeed/scm"
	"github.com/autograde/quickfeed/web/config"
	"go.uber.org/zap"
	"google.golang.org/grpc/metadata"
)

// TestDB returns a test database and close function.
// This function should only be used as a test helper.
func TestDB(t *testing.T) (database.Database, func()) {
	t.Helper()

	f, err := ioutil.TempFile(t.TempDir(), "test.db")
	if err != nil {
		t.Fatal(err)
	}
	if err := f.Close(); err != nil {
		os.Remove(f.Name())
		t.Fatal(err)
	}

	db, err := database.NewGormDB(f.Name(), log.Zap(true))
	if err != nil {
		os.Remove(f.Name())
		t.Fatal(err)
	}

	return db, func() {
		if err := db.Close(); err != nil {
			t.Error(err)
		}
		if err := os.Remove(f.Name()); err != nil {
			t.Error(err)
		}
	}
}

// TestConfig creates a configuration for test instance of the AutograderService
func TestConfig(t *testing.T) *config.Config {
	// TODO(vera): add a file with all test-specific configuration constants to qtest package
	return config.NewConfig("tmp", "tmp", "tmp")
}

// CreateFakeUser is a test helper to create a user in the database
// with the given remote id and the fake scm provider.
func CreateFakeUser(t *testing.T, db database.Database, remoteID uint64) *pb.User {
	t.Helper()
	var user pb.User
	err := db.CreateUserFromRemoteIdentity(&user,
		&pb.RemoteIdentity{
			Provider:    "fake",
			RemoteID:    remoteID,
			AccessToken: "token",
		})
	if err != nil {
		t.Fatal(err)
	}
	return &user
}

func CreateUserFromRemoteIdentity(t *testing.T, db database.Database, remoteID *pb.RemoteIdentity) *pb.User {
	t.Helper()
	var user pb.User
	if err := db.CreateUserFromRemoteIdentity(&user, remoteID); err != nil {
		t.Fatal(err)
	}
	return &user
}

func CreateNamedUser(t *testing.T, db database.Database, remoteID uint64, name string) *pb.User {
	t.Helper()
	user := &pb.User{Name: name}
	err := db.CreateUserFromRemoteIdentity(user,
		&pb.RemoteIdentity{
			Provider:    "fake",
			RemoteID:    remoteID,
			AccessToken: "token",
		})
	if err != nil {
		t.Fatal(err)
	}
	return user
}

func CreateUser(t *testing.T, db database.Database, remoteID uint64, user *pb.User) *pb.User {
	t.Helper()
	err := db.CreateUserFromRemoteIdentity(user,
		&pb.RemoteIdentity{
			Provider:    "fake",
			RemoteID:    remoteID,
			AccessToken: "token",
		})
	if err != nil {
		t.Fatal(err)
	}
	return user
}

func CreateCourse(t *testing.T, db database.Database, user *pb.User, course *pb.Course) {
	t.Helper()
	if course.Provider == "" {
		for _, rid := range user.RemoteIdentities {
			if rid.Provider != "" {
				course.Provider = rid.Provider
			}
		}
	}
	if err := db.CreateCourse(user.ID, course); err != nil {
		t.Fatal(err)
	}
}

func EnrollStudent(t *testing.T, db database.Database, student *pb.User, course *pb.Course) {
	t.Helper()
	if err := db.CreateEnrollment(&pb.Enrollment{UserID: student.ID, CourseID: course.ID}); err != nil {
		t.Fatal(err)
	}
	if err := db.UpdateEnrollment(&pb.Enrollment{
		UserID:   student.ID,
		CourseID: course.ID,
		Status:   pb.Enrollment_STUDENT,
	}); err != nil {
		t.Fatal(err)
	}
}

// FakeProviderMap is a test helper function to create an SCM map.
func FakeProviderMap(t *testing.T) (scm.SCM, *scm.Scms) {
	t.Helper()
	scms := scm.NewScms()
	return scm.NewFakeSCMClient(), scms
}

func RandomString(t *testing.T) string {
	t.Helper()
	randomness := make([]byte, 10)
	if _, err := rand.Read(randomness); err != nil {
		t.Fatal(err)
	}
	return fmt.Sprintf("%x", sha256.Sum256(randomness))[:6]
}

// WithUserContext is a test helper function to create metadata for the
// given user mimicking the context coming from the browser.
func WithUserContext(ctx context.Context, user *pb.User) context.Context {
	userID := strconv.Itoa(int(user.GetID()))
	meta := metadata.New(map[string]string{"user": userID})
	return metadata.NewIncomingContext(ctx, meta)
}

func TestSCMClient(ctx context.Context, t *testing.T, org, provider, token string) scm.SCM {
	app, err := scm.NewApp()
	if err != nil {
		t.Fatal(err)
	}
	client, err := app.NewInstallationClient(ctx, org)
	if err != nil {
		t.Fatal(err)
	}
	s, err := scm.NewSCMClient(zap.NewNop().Sugar(), client, "github", token)
	if err != nil {
		t.Fatal(err)
	}
	return s
}

// PopulateDatabaseWithInitialData creates initial data-records based on organization
func PopulateDatabaseWithInitialData(t *testing.T, db database.Database, sc scm.SCM, course *pb.Course) error {
	t.Helper()

	ctx := context.Background()
	org, err := sc.GetOrganization(ctx, &scm.GetOrgOptions{Name: course.Name})
	if err != nil {
		return err
	}

	admin := CreateFakeUser(t, db, uint64(1))
	CreateCourse(t, db, admin, course)

	repos, err := sc.GetRepositories(ctx, org)
	if err != nil {
		return err
	}

	// Create repositories
	nxtRemoteID := uint64(2)
	for _, repo := range repos {
		var user *pb.User
		dbRepo := &pb.Repository{
			RepositoryID:   repo.ID,
			OrganizationID: org.GetID(),
			HTMLURL:        repo.WebURL,
		}
		switch repo.Path {
		case pb.InfoRepo:
			dbRepo.RepoType = pb.Repository_COURSEINFO
		case pb.AssignmentRepo:
			dbRepo.RepoType = pb.Repository_ASSIGNMENTS
		case pb.TestsRepo:
			dbRepo.RepoType = pb.Repository_TESTS
		default:
			// TODO(Espeland): Could use CreateNamedUser() instead.
			user = CreateFakeUser(t, db, nxtRemoteID)
			// For testing purposes, assume all student repositories are group repositories
			// since tasks are only supported for groups anyway.
			dbRepo.RepoType = pb.Repository_GROUP
			dbRepo.UserID = user.GetID()
		}

		t.Logf("create repo: %v", dbRepo)
		if err = db.CreateRepository(dbRepo); err != nil {
			return err
		}
		nxtRemoteID++
	}
	return nil
}
