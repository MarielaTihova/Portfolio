import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../common/constants';
import Workspace from './workspace';
import Country from '../Country/Country';
import Matrix from './Matrix';
import GridMatrix from './GridMatrix';


const WorkspaceByCountry = (props) => {

    const countryName = props.match.params['countryName'];

    const [workspace, setWorkspace] = useState({
        id: 1,
        numberOfDesks: 0,
        width: 0,
        height: 0,
        country: null,
        matrix: '[]',
    });

    useEffect(() => {
        fetch(`${BASE_URL}/workspaces/${countryName}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    setWorkspace(result);
                }
            })
            .catch((error) => alert(error));
    }, [countryName/*, workspace*/]);



    const nextWeekPlanning = (employeeId) => {
        fetch(`${BASE_URL}/workspaces/${countryName}/employeesNextWeek`, {
            method: 'PUT',
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("DELETE Project", result);
                if ((result.error)) {
                    throw new Error(result.message);

                }
                else {
                    setWorkspace(result);
                }
            })
            .catch((error) => alert(error.message))
    }
    const changeElem = (el1, el2) => {
        fetch(`${BASE_URL}/workspaces/${countryName}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ coord1: el1, coord2: el2 }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("RESULT", result);
                if (result.error) {
                    throw new Error(result.message);

                }
                else {
                    // const newReviews = [...reviews];
                    // newReviews.map((r) => {

                    //     if (r.id === foundReview.id) {
                    //         r = result
                    //     }

                    // })
                    // setReviews(newReviews);
                    // const newMatrix = JSON.parse(workspace.matrix);
                    // newMatrix = result.matrix;

                    let mat = workspace.matrix;
                    mat = result.matrix;
                    let newWorkspace = workspace;
                    newWorkspace.matrix = mat;
                    setWorkspace(newWorkspace);

                    console.log("In Else");
                    console.log("workspace", workspace);
                }
            })
            .catch((error) => alert(error.message))
    }

    //  const req = changeElem();
    // <h1> SOme text </h1>
    // <Workspace workspace={Workspace}/> 
    // <p>ID: {workspace.id} </p>
    // <p>Desks: {workspace.numberOfDesks} </p>
    //  <p>Width: {workspace.width} </p>
    //  <p>Height: {workspace.height} </p>
    //<p>Country name: {workspace.country.name} </p>
    //  {workspace.country &&
    // <Country country={workspace.country} />}
    // <p>{workspace.matrix}</p>
    //  <Matrix matrix={workspace.matrix} />
    return (

        <div>
            {workspace.country &&
                <Workspace workspace={workspace} req={changeElem}/*changeElem={() => { }} /*newEl={5} */ />}
        </div>
    )
};



export default WorkspaceByCountry;