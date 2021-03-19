import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { BASE_URL } from '../../common/constants';
import Workspace from './workspace';

const CreateWorkspace = (props) => {

    const history = props.history;
    const [wss, setWss] = useState([]);
    const [workspace, setWorkspace] = useState({
        numberOfDesks: 0,
        width: 0,
        height: 0,
        country: '',
        matrix: '[]',
        nextWeekPlanningMatrix: '[]'
    });

    const updateWorkspace = (prop, value) => setWorkspace({ ...workspace, [prop]: value });

    const countryName = workspace.country ? workspace.country.name : '';
    // useEffect(() => {
    //     fetch(`${BASE_URL}/workspaces`)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             if (result.error) {
    //                 throw new Error(result.error);
    //                 //console.log("err message", result.error);
    //             } else {
    //                 console.log("ALL Workspaces", result);
    //                 setWss(result);
    //             }
    //         })
    //         .catch((error) => alert(error));
    // }, []);

    // useEffect(() => {
    //     if (countryName) {
    //         fetch(`${BASE_URL}/workspaces/${countryName}`)
    //             .then((response) => response.json())
    //             .then((result) => {
    //                 if (result.error) {
    //                     throw new Error(result.error);
    //                     //console.log("err message", result.error);
    //                 } else {
    //                     console.log("SINGLE Workspace", result);
    //                     const requestedProject = {
    //                         id: result.id,
    //                         numberOfDesks: result.numberOfDesks,
    //                         width: result.width,
    //                         height: result.height,
    //                         country: result.country.name,
    //                         matrix: result.matrix,
    //                         nextWeekPlanningMatrix: result.nextWeekPlanningMatrix
    //                     }
    //                     setWorkspace(requestedProject);
    //                     //setWorkspace(result);
    //                 }
    //             })
    //             .catch((error) => alert(error));
    //     }

    // }, []);

    const createWorkspace = () => {
        fetch(`${BASE_URL}/workspaces`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...workspace }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("RESULT", result);
                if (result.error) {
                    throw new Error(result.message);

                }
                else {
                    setWorkspace(result);
                    history.push(`workspaces/${result.country.name}`);
                }
            })
            .catch((error) => alert(error.message))
    }


    const changeElem = (el1, el2) => {
        fetch(`${BASE_URL}/workspaces/${workspace.country.name}`, {
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
        <div>
            <Row>
                <table className="table">
                    <thead id="header">
                        <tr className="table-data">
                            <th>Create a new office workspace:</th>

                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <Form id="vacation-form">
                    <Form.Row className="form-content">
                        <Col xs={4}>
                            <Form.Control placeholder="Number of desks" type="text" onChange={(e) => updateWorkspace('numberOfDesks', e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Width" type="text" onChange={(e) => updateWorkspace('width', e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Height" type="text" onChange={(e) => updateWorkspace('height', e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Country" type="text" onChange={(e) => updateWorkspace('country', e.target.value)} />
                        </Col>
                        <Col>
                            <Button type="submit" className="mb-2" id="submt-btn" onClick={createWorkspace}>
                                Submit
                                </Button>
                        </Col>
                    </Form.Row>
                </Form>

            </Row>

            <Row>
                {workspace.country &&
                    <Workspace workspace={workspace} req={changeElem} />}
            </Row>
        </div >

    )
}

export default CreateWorkspace;