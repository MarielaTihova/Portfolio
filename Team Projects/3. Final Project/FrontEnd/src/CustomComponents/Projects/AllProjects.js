import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Country from '../Country/Country';
import UserContext from '../../providers/UserContext';
import { BASE_URL } from '../../common/constants';
import '../../Demo/Maps/Vacations.css';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';




const AllProjects = (props) => {



    const history = props.history;
    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const [projects, setProjects] = useState([]);

    const [appProject, setAppProject] = useState({
        name: '',
        location: '',

    });

    const updateProject = (prop, value) => setAppProject({ ...appProject, [prop]: value });

    useEffect(() => {
        if (loggedUser) {
            // fetch(`${BASE_URL}/admin/users/`)
            fetch(`${BASE_URL}/projects`)
                .then((response) => response.json())
                .then((result) => {
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        setProjects(result);

                    }
                })
                .catch((error) => console.log(error.message))
        }
    }, []);

    const createNewProject = () => {
        fetch(`${BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...appProject
            }),
        })
            .then(r => r.json())
            .then(result => {
                console.log('Create new project', result)
                if (result.error) {
                    return alert(result.message);
                }

                setAppProject(result);
            })
            .catch(alert);
    };


    const deleteProject = (projectId) => {



        const foundProject = projects.find(p => p.id === projectId);

        if (!foundProject) {
            return alert(`No project with id ${projectId}`)
        }

        else {

            //alert(`delete vac ${id}`);
            fetch(`${BASE_URL}/projects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(r => r.json())
                .then(result => {
                    if (result.error) {
                        return alert(result.message);
                    }

                    else {
                        const newProjects = projects.reduce((acc, project) => {

                            if (project.id !== result.id) {
                                acc.push(project);
                            }

                            return acc;
                        }, []);

                        setProjects(newProjects);
                    }
                    // history.push('/maps/google-map');
                })
                .catch(alert);

        }


    }


    return (

        <div className="table-responsive">
            <Row>
                <table className="table">
                    <thead id="header">
                        <tr className="table-data">
                            <th>Create a new project:</th>

                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <Form id="vacation-form">
                    <Form.Row className="form-content">
                        <Col xs={4}>
                            <Form.Control placeholder="Project name" type="text" value={appProject.name} onChange={(e) => updateProject('name', e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Country" type="text" value={appProject.location.name} onChange={(e) => updateProject('location', e.target.value)} />
                        </Col>
                        <Col>
                            <Button type="submit" className="mb-2" id="submt-btn" onClick={() => { createNewProject() }}>
                                Submit
                        </Button>
                        </Col>
                    </Form.Row>
                </Form>

            </Row>


            <table className="table">
                <thead id="header">
                    <tr className="table-data">
                        <th>#</th>
                        <th>Project name</th>
                        <th>Country</th>
                        <th>Details</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p, index) => <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                        <td>{p.id} </td>
                        <td>{p.name}</td>
                        <td><Country country={p.location} /> </td>

                        <td><button class="update-btn" onClick={() => { history.push(`projects/${p.id}`) }}><i class="fa fa-arrow-circle-right 55px"></i></button></td>
                        <td><button class="cancel-btn" onClick={() => { deleteProject(p.id) }}><i class="fa fa-close"></i></button></td>



                        {/* {
                            ***** ADMIN *****
                            u.workStatus === 'Home' ? (
                                <label className="badge badge-warning">{u.workStatus}</label>
                            ) : (u.workStatus === 'Office' ?
                                <label className="badge badge-success">{u.workStatus}</label>
                                : <label className="badge badge-danger">{u.workStatus}</label>)
                        } */}



                    </tr>)}
                </tbody></table>
        </div>

    )

}
export default AllProjects;