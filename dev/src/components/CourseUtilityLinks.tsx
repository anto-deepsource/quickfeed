import React from "react"
import { Link } from "react-router-dom"
import { Repository } from "../../proto/ag/ag_pb"
import { useAppState } from "../overmind"



const CourseUtilityLinks = ({courseID}: {courseID: number}): JSX.Element => {

    const state = useAppState()

    return (
        <div className="col-sm-3" >           
        <div className="list-group">
            <div className="list-group-item list-group-item-action active text-center"><h6><strong>Utility</strong></h6></div>
                <a href={state.repositories[courseID][Repository.Type.USER]} className="list-group-item list-group-item-action">
                    User Repository
                </a>
            {state.repositories[courseID][Repository.Type.GROUP] !== "" ?(
                <a href={state.repositories[courseID][Repository.Type.GROUP]} className="list-group-item list-group-item-action overflow-ellipses" style={{textAlign:"left"}}>
                    Group Repository ({state.enrollmentsByCourseId[courseID].getGroup()?.getName()})
                </a>
            ):(
                <Link to={"/course/" + courseID + "/group"} className="list-group-item list-group-item-action list-group-item-success">
                    Create a Group
                </Link>
            )}
                <a href={state.repositories[courseID][Repository.Type.ASSIGNMENTS]} className="list-group-item list-group-item-action">
                    Assignments
                </a>

                <a href={state.repositories[courseID][Repository.Type.COURSEINFO]} className="list-group-item list-group-item-action">
                    Course Info
                </a>

            {state.enrollmentsByCourseId[courseID].hasGroup() ? 
                <Link to={"/course/" + courseID + "/group"} className="list-group-item list-group-item-action">
                    View Group
                </Link>
            : null}
        </div>
    </div>
    )
}

export default CourseUtilityLinks