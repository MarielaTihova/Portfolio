import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Country from '../Country/Country';
import UserContext from '../../providers/UserContext';
import { BASE_URL } from '../../common/constants';
import '../../Demo/Maps/Vacations.css';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';




const UpdateProject = (props) => {

    const history = props.history;
    const id = props.match.params['id'];
    const countryName = props.match.params['countryName'];

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const [projectMembers, setProjectMembers] = useState([]);
    const [unassignedEmployees, setUnnasignedEmployees] = useState([]);

    const [showAvailable, setShowAvailable] = useState(false);

    const [appProject, setAppProject] = useState({
        name: '',
        location: '',

    });

    const projectIdObj = {
        id: id
    };


    const updateProject = (prop, value) => setAppProject({ ...appProject, [prop]: value });

    useEffect(() => {
        if (loggedUser) {
            // fetch(`${BASE_URL}/admin/users/`)
            fetch(`${BASE_URL}/projects/${id}`)
                .then((response) => response.json())
                .then((result) => {
                    console.log("SINGLE project", result);
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        const requestedProject = {
                            name: result.name,
                            location: result.location.name
                        }
                        setAppProject(requestedProject);

                    }
                })
                .catch((error) => console.log(error.message))
        }
    }, [id]);

    console.log("APPproject", appProject);



    useEffect(() => {
        if (loggedUser) {
            // fetch(`${BASE_URL}/admin/users/`)
            fetch(`${BASE_URL}/projects/${id}/employees`)
                .then((response) => response.json())
                .then((result) => {
                    console.log("Curr country people", result);
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        // const employeesForThisProject = result.filter(empl => empl.id > 7)
                        setProjectMembers(result);

                    }
                })
                .catch((error) => console.log(error.message))
        }
    }, []);


    const getUnassignedEmployees = () => {

        if (loggedUser) {
            // fetch(`${BASE_URL}/admin/users/`)
            fetch(`${BASE_URL}/countries/${appProject.location}/employees`)
                .then((response) => response.json())
                .then((result) => {
                    console.log("Unassigned empl", result);
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        // const employeesForThisProject = result.filter(empl => empl.id > 7)
                        setUnnasignedEmployees(result);
                        setShowAvailable(true);
                    }
                })
                .catch((error) => console.log(error.message));
        }

    }

    const unassignEmployee = (employeeId) => {
        fetch(`${BASE_URL}/projects/${id}/employees/${employeeId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("DELETE Project", result);
                if ((result.error)) {
                    throw new Error(result.message);

                }
                else {
                    const filteredProjectMembers = projectMembers.filter(member => member.id !== employeeId);
                    setProjectMembers(filteredProjectMembers);

                    const newUnassigned = unassignedEmployees;
                    const unassigned2 = [...newUnassigned, result];
                    // newUnassigned[newUnassigned.length] = result;
                    setUnnasignedEmployees(unassigned2);
                    //unassignedEmployees.push(result);
                }
            })
            .catch((error) => alert(error.message))
    }

    const assignEmployee = (userId) => {
        fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ ...projectIdObj }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Assign Project", result);
                if ((result.error)) {
                    throw new Error(result.message);

                }
                else {

                    const filteredUnassignedMembers = unassignedEmployees.filter(empl => empl.id !== userId);
                    setUnnasignedEmployees(filteredUnassignedMembers);
                    const newProjectMembers = projectMembers;

                    // const newUnassigned = unassignedEmployees;
                    const statusArr = ['Office', 'Home', 'Vacation'];
                    let userWorkStatus = statusArr[result.workStatus - 1];

                    const modifiedResult = result;
                    modifiedResult.workStatus = userWorkStatus;
                    const projectMembers2 = [...newProjectMembers, modifiedResult];
                    // newUnassigned[newUnassigned.length] = result;
                    //setUnnasignedEmployees(projectMembers2);


                    setProjectMembers(projectMembers2);
                    //newProjectMembers.push(result)

                }
            })
            .catch((error) => alert(error.message))
    }

    console.log('Members in project', projectMembers);


    const updateProjectRequest = () => {



        fetch(`${BASE_URL}/projects/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify({ ...appProject }),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Update Project", result);
                if ((result.error)) {
                    throw new Error(result.message);

                }
                else {

                    const requestedProject = {
                        name: result.name,
                        location: result.location.name
                    }
                    setAppProject(requestedProject);
                    history.push('/projects');
                }
            })
            .catch((error) => alert(error.message))
    }





    return (

        <div className="table-responsive">
            <Row className="project-details">
                <Col>{appProject.name}</Col>
                <Col>{appProject.location}</Col>
            </Row>
            <Form id="project-form">
                <Form.Row className="form-content">
                    <Col xs={4}>
                        <Form.Control placeholder="Project name" type="text" value={appProject.name} onChange={(e) => updateProject('name', e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Control placeholder="Country" type="text" value={appProject.location} onChange={(e) => updateProject('location', e.target.value)} />
                    </Col>
                    <Col>
                        <Button type="submit" className="mb-2" id="submt-btn-project" onClick={updateProjectRequest}>
                            Update
                    </Button>

                        <Button type="submit" className="mb-2" id="submt-btn-project" onClick={() => { history.push('/projects') }}>
                            Back
                         </Button>



                    </Col>

                    <Col>


                    </Col>
                </Form.Row>
            </Form>

            <table className="table">
                <thead id="header">
                    <tr className="table-data">
                        <th>#</th>
                        <th>Username</th>
                        <th>Personal name</th>
                        <th>Email</th>
                        <th>Work status</th>
                        <th>Unassign</th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {projectMembers.map((member, index) => <tr key={index} className={index % 2 === 0 ? 'even-third' : 'odd-third'}>
                        <td>{member.id} <img width="50px" height="50px" src={member.avatar}></img> </td>
                        <td>{member.username}</td>
                        <td>{member.personalName}</td>
                        <td>{member.email}</td>
                        <td> {

                            member.workStatus === 'Home' ? (
                                <label className="badge badge-warning">Home</label>
                            ) : (member.workStatus === 'Office' ?
                                <label className="badge badge-success">Office</label>
                                : <label className="badge badge-danger">Vacation</label>)
                        }</td>

                        <td><button class="cancel-btn" onClick={() => unassignEmployee(member.id)}><i class="fa fa-close"></i></button></td>


                    </tr>)}
                </tbody></table>

            <Row style={{ marginTop: "5%", marginLeft: "0.2%" }}>
                <Col style={{ marginLeft: "0%", border: "2px solid #979cec" }}>
                    <b> Want to assign more people to this project? Click the button on the right to see who is available from this country.</b>
                </Col>
                <Col>
                    <Button type="submit" className="mb-2" id="submt-btn-project" onClick={getUnassignedEmployees} style={{ marginLeft: "10%" }}>
                        Available people from this country
             </Button>
                </Col>
            </Row>


            {showAvailable ?
                <table className="table">
                    <thead id="header">
                        <tr className="table-data">
                            <th>#</th>
                            <th>Username</th>
                            <th>Personal name</th>
                            <th>Email</th>
                            <th>Work status</th>
                            <th>Assign</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {unassignedEmployees.map((member, index) => <tr className={index % 2 === 0 ? 'even-secondary' : 'odd-secondary'}>
                            <td>{member.id} <img width="50px" height="50px" src={member.avatar}></img> </td>
                            <td>{member.username}</td>
                            <td>{member.personalName}</td>
                            <td>{member.email}</td>
                            <td> {

                                member.workStatus === 2 ? (
                                    <label className="badge badge-warning">Home</label>
                                ) : (member.workStatus === 1 ?
                                    <label className="badge badge-success">Office</label>
                                    : <label className="badge badge-danger">Vacation</label>)
                            }</td>

                            <td><button className="assign-btn" onClick={() => assignEmployee(member.id)}><i class="fa fa-check" aria-hidden="true"></i></button></td>


                        </tr>)}
                    </tbody>
                </table> : null}
        </div>

    )

}
export default UpdateProject;