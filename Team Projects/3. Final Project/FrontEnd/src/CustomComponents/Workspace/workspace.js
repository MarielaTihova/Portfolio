import React from 'react'
import PropTypes from 'prop-types'
import Country from '../Country/Country';
import Matrix from './Matrix';



const Workspace = (props) => {
    const ws = props.workspace;
    //  const newEl = props.newEl;
    const req = props.req;
    console.log(ws);
    //  const changeElem = props.changeElem;
    return (
        <div className="workspace">

            {/* <h1>ID: {ws.id}</h1>
            <p>Desks: {ws.numberOfDesks}</p>
            <p>Width: {ws.width}</p>
            <p>Height: {ws.height}</p>
            <p>Current week: {ws.matrix}</p>
            <p>NEXT week planning: {ws.nextWeekPlanningMatrix}</p>*/}
            <Country country={ws.country} /><div className="country">Office</div>
            <div className="this-week-heading">Current week</div>
            <Matrix matrix={ws.matrix} req={req} cellClass="curr-week" labelClass="badge badge-danger" /*changeElem={changeElem}/*changeElem={changeElem}*/ /*newEl={newEl}*/ />
            <br />
            <div className="this-week-heading">Next week</div>
            <Matrix matrix={ws.nextWeekPlanningMatrix} req={req} cellClass="next-week" labelClass="badge badge-warning" />
            {/* <p>{ws.country.name}</p>  */}

        </div>
    )


}

Workspace.protoTypes = {
    workspace: PropTypes.object.isRequired,
}

export default Workspace