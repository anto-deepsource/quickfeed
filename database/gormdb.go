package database

import (
	"errors"
	"fmt"

	pb "github.com/autograde/quickfeed/ag"
	"github.com/autograde/quickfeed/kit/score"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var (
	// ErrDuplicateIdentity is returned when trying to associate a remote identity
	// with a user account and the identity is already in use.
	ErrDuplicateIdentity = errors.New("remote identity registered with another user")
	// ErrEmptyGroup is returned when trying to create a group without users.
	ErrEmptyGroup = errors.New("cannot create group without users")
	// ErrDuplicateGroup is returned when trying to create a group with the same
	// name as a previously registered group.
	ErrDuplicateGroup = status.Error(codes.InvalidArgument, "group with this name already registered")
	// ErrUpdateGroup is returned when updating a group's enrollment fails.
	ErrUpdateGroup = errors.New("failed to update group enrollment")
	// ErrCourseExists is returned when trying to create an association in
	// the database for a DirectoryId that already exists in the database.
	ErrCourseExists = errors.New("course already exists on git provider")
	// ErrInsufficientAccess is returned when trying to update database
	// with insufficient access privileges.
	ErrInsufficientAccess = errors.New("user must be admin to perform this operation")
	// ErrCreateRepo is returned when trying to create repository with wrong argument.
	ErrCreateRepo = errors.New("failed to create repository; invalid arguments")
	// ErrNotEnrolled is returned when the requested user or group do not have
	// the expected association with the given course
	ErrNotEnrolled = errors.New("user or group not enrolled in the course")
)

// GormDB implements the Database interface.
type GormDB struct {
	conn *gorm.DB
}

// NewGormDB creates a new gorm database using the provided driver.
func NewGormDB(path string, logger *zap.Logger) (*GormDB, error) {
	conn, err := gorm.Open(sqlite.Open(path), &gorm.Config{
		Logger: NewGORMLogger(logger),
	})
	if err != nil {
		return nil, err
	}

	if err := conn.AutoMigrate(
		&pb.User{},
		&pb.RemoteIdentity{},
		&pb.Course{},
		&pb.Enrollment{},
		&pb.Assignment{},
		&pb.Submission{},
		&pb.Group{},
		&pb.Repository{},
		&pb.UsedSlipDays{},
		&pb.GradingBenchmark{},
		&pb.GradingCriterion{},
		&pb.Review{},
		&pb.UpdateTokenRecord{},
		&score.BuildInfo{},
		&score.Score{},
	); err != nil {
		return nil, err
	}

	return &GormDB{conn}, nil
}

///  Remote Identities ///

// CreateUserFromRemoteIdentity creates new user record from remote identity, sets user with ID 1 as admin.
func (db *GormDB) CreateUserFromRemoteIdentity(user *pb.User, remoteIdentity *pb.RemoteIdentity) error {
	user.RemoteIdentities = []*pb.RemoteIdentity{remoteIdentity}
	if err := db.conn.Create(&user).Error; err != nil {
		return err
	}
	// The first user defaults to admin user.
	if user.ID == 1 {
		user.IsAdmin = true
		if err := db.UpdateUser(user); err != nil {
			return err
		}
	}
	return nil
}

// AssociateUserWithRemoteIdentity associates remote identity with the user with given ID.
func (db *GormDB) AssociateUserWithRemoteIdentity(uid uint64, provider string, remoteID uint64, accessToken string) error {
	var count int64
	if err := db.conn.
		Model(&pb.RemoteIdentity{}).
		Where(&pb.RemoteIdentity{
			Provider: provider,
			RemoteID: remoteID,
		}).
		Not(&pb.RemoteIdentity{
			UserID: uid,
		}).
		Count(&count).Error; err != nil {
		return err
	}
	if count > 0 {
		return ErrDuplicateIdentity
	}

	var remoteIdentity pb.RemoteIdentity
	return db.conn.
		Where(pb.RemoteIdentity{Provider: provider, RemoteID: remoteID, UserID: uid}).
		Assign(pb.RemoteIdentity{AccessToken: accessToken}).
		FirstOrCreate(&remoteIdentity).Error
}

// UpdateAccessToken refreshes the token info for the given remote identity.
func (db *GormDB) UpdateAccessToken(remote *pb.RemoteIdentity) error {
	tx := db.conn.Begin()

	// Get the remote identity.
	var remoteIdentity pb.RemoteIdentity
	if err := tx.
		Where(&pb.RemoteIdentity{
			Provider: remote.Provider,
			RemoteID: remote.RemoteID,
		}).
		First(&remoteIdentity).Error; err != nil {
		tx.Rollback()
		return err
	}

	if err := tx.Model(&remoteIdentity).Update("access_token", remote.AccessToken).Error; err != nil {
		tx.Rollback()
		return err
	}
	if err := tx.Commit().Error; err != nil {
		return err
	}

	return db.updateCourseAccessTokensIfCourseCreator(&remoteIdentity)
}

// Update the access token cache for courses for which the user is course creator.
// The cache allows easy access to the access token via the Course type.
func (db *GormDB) updateCourseAccessTokensIfCourseCreator(remoteIdentity *pb.RemoteIdentity) error {
	userID := remoteIdentity.GetUserID()
	enrollments, err := db.GetEnrollmentsByUser(userID, pb.Enrollment_TEACHER)
	if err != nil {
		return err
	}
	for _, enrollment := range enrollments {
		course := enrollment.GetCourse()
		if course.GetCourseCreatorID() == userID {
			pb.SetAccessToken(course.GetID(), remoteIdentity.AccessToken)
		}
	}
	return nil
}

// updateCourseAccessTokenIfEmpty updates the access token cache for the course, if the course has no cached access token.
// The cache allows easy access to the access token via the Course type.
func (db *GormDB) updateCourseAccessTokenIfEmpty(course *pb.Course) error {
	existingToken := course.GetAccessToken()
	if existingToken != "" {
		// already cached
		return nil
	}
	// only need to query db if not in cache; will happen after restart of server
	courseCreator, err := db.GetUser(course.GetCourseCreatorID())
	if err != nil {
		return fmt.Errorf("failed to get course creator '%d' for %s: %w", course.GetCourseCreatorID(), course, err)
	}
	accessToken, err := courseCreator.GetAccessToken(course.GetProvider())
	if err != nil {
		return fmt.Errorf("failed to get course creator's '%d' access token for %s: %w", course.GetCourseCreatorID(), course.GetProvider(), err)
	}
	// update the access token cache
	pb.SetAccessToken(course.GetID(), accessToken)
	return nil
}

func (db *GormDB) Close() error {
	sqlDB, err := db.conn.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
