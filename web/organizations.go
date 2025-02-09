package web

import (
	"context"

	"github.com/quickfeed/quickfeed/qf"
	"github.com/quickfeed/quickfeed/scm"
)

func (s *QuickFeedService) getOrganization(ctx context.Context, sc scm.SCM, org string, user string) (*qf.Organization, error) {
	gitOrg, err := sc.GetOrganization(ctx, &scm.GetOrgOptions{Name: org, Username: user})
	if err != nil {
		return nil, err
	}
	// check payment plan
	if gitOrg.GetPaymentPlan() == FreeOrgPlan {
		return nil, ErrFreePlan
	}
	// check course repos
	repos, err := sc.GetRepositories(ctx, gitOrg)
	if err != nil {
		return nil, err
	}
	if isDirty(repos) {
		return nil, ErrAlreadyExists
	}
	return gitOrg, nil
}
