package scm

import (
	"context"
	"fmt"
	"path/filepath"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
	"github.com/go-git/go-git/v5/plumbing/transport/http"
	"github.com/quickfeed/quickfeed/qf"
)

const authUserName = "quickfeed" // can be anything except an empty string

// Clone clones the given repository and returns the path to the cloned repository.
// The returned path is the provided destination directory joined with the
// repository type, e.g., "assignments" or "tests".
func (s GithubSCM) Clone(ctx context.Context, opt *CloneOptions) (string, error) {
	cloneDir := filepath.Join(opt.DestDir, repoDir(opt))
	s.logger.Debugf("Clone(%s)", s.cloneURL(opt))
	var branch plumbing.ReferenceName
	if opt.Branch != "" {
		branch = plumbing.NewBranchReferenceName(opt.Branch)
	}
	_, err := git.PlainCloneContext(ctx, cloneDir, false, &git.CloneOptions{
		Auth:          &http.BasicAuth{Username: authUserName, Password: s.token},
		URL:           s.cloneURL(opt),
		ReferenceName: branch,
	})
	if err != nil {
		return "", err
	}
	s.logger.Debugf("CloneDir = %s", cloneDir)
	return cloneDir, nil
}

func repoDir(opt *CloneOptions) string {
	if qf.RepoType(opt.Repository).IsStudentRepo() {
		return qf.AssignmentRepo
	}
	return qf.TestsRepo
}

// cloneURL returns the URL to clone the given repository.
func (s GithubSCM) cloneURL(opt *CloneOptions) string {
	return fmt.Sprintf("https://%s/%s/%s.git", s.providerURL, opt.Organization, opt.Repository)
}

type CloneOptions struct {
	Organization string
	Repository   string
	Branch       string
	DestDir      string
}
