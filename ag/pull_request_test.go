package ag_test

import (
	"testing"

	pb "github.com/autograde/quickfeed/ag"
)

func TestIsValid(t *testing.T) {
	tests := map[string]struct {
		pr   *pb.PullRequest
		want bool
	}{
		"Valid":                        {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 1, IssueID: 1, UserID: 1, SourceBranchName: "A", Number: 1}, want: true},
		"Invalid ExternalRepositoryID": {pr: &pb.PullRequest{ExternalRepositoryID: 0, TaskID: 1, IssueID: 1, UserID: 1, SourceBranchName: "A", Number: 1}, want: false},
		"Invalid TaskID":               {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 0, IssueID: 1, UserID: 1, SourceBranchName: "A", Number: 1}, want: false},
		"Invalid IssueID":              {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 1, IssueID: 0, UserID: 1, SourceBranchName: "A", Number: 1}, want: false},
		"Invalid UserID":               {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 1, IssueID: 1, UserID: 0, SourceBranchName: "A", Number: 1}, want: false},
		"Invalid SourceBranchName":     {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 1, IssueID: 1, UserID: 1, SourceBranchName: "", Number: 1}, want: false},
		"Invalid Number":               {pr: &pb.PullRequest{ExternalRepositoryID: 1, TaskID: 1, IssueID: 1, UserID: 1, SourceBranchName: "A", Number: 0}, want: false},
	}
	for name, tt := range tests {
		t.Run(name, func(t *testing.T) {
			got := tt.pr.IsValid()
			if tt.want != got {
				t.Errorf("IsValid() = %t, expected %t\npr: %v", got, tt.want, tt.pr)
			}
		})
	}
}
