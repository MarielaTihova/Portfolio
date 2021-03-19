import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BASE_URL } from '../../../common/constants';
import Workspace from '../../../CustomComponents/Workspace/workspace';

import Aux from "../../../hoc/_Aux";
import UserContext from '../../../providers/UserContext';

const BasicTypography = (props) => {

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const country = loggedUser ? loggedUser.country.name : '';

    // const countryName = props.match.params['countryName'];

    const [workspace, setWorkspace] = useState({
        id: 1,
        numberOfDesks: 0,
        width: 0,
        height: 0,
        country: null,
        matrix: '[]',
    });

    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/workspaces/${country}`)
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
        }
    }, [/*countryName/*, workspace*/]);

    const changeElem = (el1, el2) => {
        fetch(`${BASE_URL}/workspaces/${country}`, {
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


    return (
        <Aux>
            {loggedUser ?
                <div>
                    {workspace.country && loggedUser &&
                        <Workspace workspace={workspace} req={changeElem} />}
                </div> :
                <div>
                    <p> <a href="/session"> Login</a> to see your country office</p>
                </div>}
        </Aux>
    );
}


export default BasicTypography;