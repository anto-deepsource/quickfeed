import * as React from "react"
import { Assignment, Course, Group, Review, User } from "../../../proto/ag/types/types_pb"
import { IAllSubmissionsForEnrollment, ISubmissionLink } from "../../models"
import { ReviewPage } from "../../components/manual-grading/Review"
import { Search } from "../../components"
import { selectFromSubmissionLinks, mapAllSubmissions, searchForUsers, searchForGroups, sortAssignmentsByOrder } from "../../componentHelper"

interface FeedbackViewProps {
    course: Course
    courseURL: string
    assignments: Assignment[]
    students: IAllSubmissionsForEnrollment[]
    groups: IAllSubmissionsForEnrollment[]
    curUser: User
    addReview: ( review: Review ) => Promise<Review | null>
    updateReview: ( review: Review ) => Promise<Review | null>
}

interface FeedbackViewState {
    allStudents: User[] // immutable, only set once in constructor
    allGroups: Group[] // immutable, only set once in constructor
    showStudents: User[]
    showGroups: Group[]
    selectedAssignment: Assignment
    selectedStudent: User | undefined
    selectedGroup: Group | undefined
    submissionsForAssignment: Map<User, ISubmissionLink> // recalculate on new assignment
    submissionsForGroupAssignment: Map<Group, ISubmissionLink> // recalculate on new group assignment
    alert: string
}

export class FeedbackView extends React.Component<FeedbackViewProps, FeedbackViewState> {

    constructor ( props: FeedbackViewProps ) {
        super( props )
        const a = this.props.assignments[ 0 ]
        this.state = {
            selectedStudent: undefined,
            selectedGroup: undefined,
            allStudents: selectFromSubmissionLinks( props.students, false ) as User[],
            allGroups: selectFromSubmissionLinks( props.groups, true ) as Group[],
            showStudents: selectFromSubmissionLinks( props.students, false ) as User[],
            showGroups: selectFromSubmissionLinks( props.groups, true ) as Group[],
            selectedAssignment: a,
            alert: "",
            submissionsForAssignment: mapAllSubmissions( props.students, false, a ) as Map<User, ISubmissionLink>,
            submissionsForGroupAssignment: mapAllSubmissions( props.groups, true, a ) as Map<Group, ISubmissionLink>,
        }
    }

    public render() {
        if ( this.props.assignments.length < 1 ) {
            return <div className="row"><div className="alert alert-info col-md-12">No assignments for { this.props.course.getName() }. </div></div>
        }
        return <div className="feedback-view">
            <div className="row"><h1>Review submissions for { this.props.course.getName() }</h1></div>

            <div className="row"><div className="col-md-8"><Search className="input-group"
                placeholder="Search for students or groups"
                onChange={ ( query ) => this.handleSearch( query ) }
            /></div>
                <div className="form-group col-md-4">
                    <select className="form-control" onChange={ ( e ) => this.toggleAssignment( e.target.value ) }>
                        { sortAssignmentsByOrder( this.props.assignments ).map( ( a, i ) => <option
                            key={ i }
                            value={ a.getId() }
                        >{ a.getName() }</option> ) }Select assignment</select>
                </div>
            </div>

            { this.renderAlert() }

            <div className="row">
                { this.renderReviewList() }
            </div>
        </div>
    }


    private renderReviewList(): JSX.Element {
        const a = this.state.selectedAssignment
        if ( !a ) {
            return <div className="alert alert-info col-md-12">Please select an assignment..</div>
        }
        if ( a.getIsgrouplab() ) {
            return <div className="col-md-12">
                <ul className="list-group">{ this.state.showGroups.map( ( grp, i ) =>
                    <li key={ i } onClick={ () => this.setState( { selectedGroup: grp } ) } className="list-group-item li-review"><ReviewPage
                        key={ "rgrp" + i }
                        assignment={ this.state.selectedAssignment }
                        submission={ this.state.submissionsForGroupAssignment.get( grp )?.submission }
                        authorName={ grp.getName() }
                        authorLogin={ grp.getName() }
                        courseURL={ this.props.courseURL }
                        reviewerID={ this.props.curUser.getId() }
                        addReview={ async ( review: Review ) => {
                            const current = this.state.submissionsForGroupAssignment.get( grp )
                            if ( current?.submission ) {
                                const ans = await this.props.addReview( review )
                                if ( ans ) {
                                    current.submission.reviews.push( ans )
                                    return ans
                                }
                            }
                            return null
                        } }
                        updateReview={ async ( review: Review ) => {
                            const current = this.state.submissionsForGroupAssignment.get( grp )
                            if ( current?.submission ) {
                                const ans = await this.props.updateReview( review )
                                const idx = current.submission.reviews.findIndex( item => item.getId() === review.getId() )
                                if ( ans && idx > -1 ) {
                                    current.submission.reviews.splice( idx, 1, ans )
                                    return ans
                                }
                            }
                            return null
                        } }
                        studentNumber={ this.state.allGroups.indexOf( grp ) + 1 }
                        isSelected={ this.state.selectedGroup === grp }
                    /></li> ) }
                </ul>
            </div>
        }

        return <div className="col-md-12">
            <ul className="list-group">{ this.state.showStudents.map( ( s, i ) =>
                <li key={ i } onClick={ () => this.setState( { selectedStudent: s } ) } className="list-group-item li-review"><ReviewPage
                    key={ "r" + i }
                    assignment={ this.state.selectedAssignment }
                    submission={ this.state.submissionsForAssignment.get( s )?.submission }
                    authorName={ s.getName() }
                    authorLogin={ s.getLogin() }
                    courseURL={ this.props.courseURL }
                    reviewerID={ this.props.curUser.getId() }
                    addReview={ async ( review: Review ) => {
                        const current = this.state.submissionsForAssignment.get( s )
                        if ( current?.submission ) {
                            const ans = await this.props.addReview( review )
                            if ( ans ) {
                                current.submission.reviews.push( ans )
                                return ans
                            }
                        }
                        return null
                    } }
                    updateReview={ async ( review: Review ) => {
                        const current = this.state.submissionsForAssignment.get( s )
                        if ( current?.submission ) {
                            const ans = await this.props.updateReview( review )
                            const idx = current.submission.reviews.findIndex( item => item.getId() === review.getId() )
                            if ( ans && idx > -1 ) {
                                current.submission.reviews.splice( idx, 1, ans )
                                return ans
                            }
                        }
                        return null
                    } }
                    studentNumber={ this.state.allStudents.indexOf( s ) + 1 }
                    isSelected={ this.state.selectedStudent === s }
                /></li> ) }
            </ul>
        </div>
    }

    private renderAlert(): JSX.Element | null {
        return this.state.alert === "" ? null : <div className="row"><div className="alert alert-warning col-md-12">{ this.state.alert }</div></div>
    }

    private toggleAssignment( id: string ) {
        const currentID = parseInt( id, 10 )
        const current = this.props.assignments.find( item => item.getId() === currentID )
        if ( current ) {
            this.setState( {
                selectedStudent: undefined,
                selectedGroup: undefined,
                selectedAssignment: current,
                submissionsForAssignment: mapAllSubmissions( this.props.students, false, current ) as Map<User, ISubmissionLink>,
                submissionsForGroupAssignment: mapAllSubmissions( this.props.groups, true, current ) as Map<Group, ISubmissionLink>,
            } )
        }
    }

    private handleSearch( query: string ) {
        const foundUsers = searchForUsers( selectFromSubmissionLinks( this.props.students, false ) as User[], query )
        const foundGroups = searchForGroups( selectFromSubmissionLinks( this.props.groups, true ) as Group[], query )
        this.setState( ( state ) => ( {
            showStudents: foundUsers,
            showGroups: foundGroups,
        } ) )
    }


}
