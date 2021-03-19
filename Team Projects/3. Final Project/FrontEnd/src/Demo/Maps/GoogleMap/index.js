import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon } from 'google-maps-react';
import * as moment from 'moment';

import Aux from "../../../hoc/_Aux";
import { BASE_URL } from '../../../common/constants';
import UserContext from '../../../providers/UserContext';
import "../Vacations.css";
import { MDBIcon } from 'mdbreact';

const GoogleMap = (props) => {

    const history = props.history;

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const [vacations, setVacations] = useState([]);

    const [currentVacation, setCurrentvacation] = useState(0)

    const [vacation, setVacation] = useState({
        startDate: '',
        endDate: '',

    });

    const updateVacation = (prop, value) => setVacation({ ...vacation, [prop]: value });

    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/users/${loggedUser.id}/vacations`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {
                        // console.log("SINGLE Workspace", result);
                        setVacations(result);
                    }
                })
                .catch((error) => alert(error));
        }
    }, []);



    const createNewVacation = () => {
        fetch(`${BASE_URL}/users/${loggedUser.id}/vacations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...vacation
            }),
        })
            .then(r => r.json())
            .then(result => {
                console.log('result: ', result);
                if (result.error) {
                    return alert(result.message);
                }



                const validateDate = new Date(vacation)
                moment(validateDate).setHours(1, 0, 0, 0)

                const newVacation = validateDate
                const vacationsArr = vacations;
                vacationsArr.push(newVacation);
                setVacations(vacationsArr);
            })
            .catch(alert);
    };


    const deleteVacation = (vacationId) => {



        const foundVacation = vacations.find(v => v.id === vacationId);

        if (!foundVacation) {
            return alert(`No vacation with id ${vacationId}`)
        }

        else {

            //alert(`delete vac ${id}`);
            fetch(`${BASE_URL}/users/${loggedUser.id}/vacations/${vacationId}`, {
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


                        const newVacation = vacations.reduce((newVac, vac) => {

                            if (vac.id !== result.id) {
                                newVac.push(vac)
                            }

                            return newVac;
                        }, []);

                        setVacations(newVacation)
                    }
                    // history.push('/maps/google-map');
                })
                .catch(alert);

        }


    }


    console.log("VACATIONS", vacations);
    return (
        <Aux>
            {
                loggedUser ?
                    <Row>
                        <table className="table">
                            <thead id="header">
                                <tr className="table-data">
                                    <th>Enter a new vacation:</th>

                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <Form id="vacation-form">
                            <Form.Row className="form-content">
                                <Col xs={4}>
                                    <Form.Control placeholder="Start date" type="date" value={vacation.startDate} onChange={(e) => updateVacation('startDate', e.target.value)} />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="End Date" type="date" value={vacation.endDate} onChange={(e) => updateVacation('endDate', e.target.value)} />
                                </Col>
                                <Col>
                                    <Button type="submit" className="mb-2" id="submt-btn" onClick={createNewVacation}>
                                        Submit
                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>

                    </Row>
                    : null}
            <Row>{
                loggedUser ?

                    <table className="table">
                        <thead id="header">
                            <tr className="table-data">
                                <th>No</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Delete Vacation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacations.map((v, index) => <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                                <td >{index + 1}</td>
                                <td >{v.startDate.substring(0, 10)}</td>
                                <td>{v.endDate.substring(0, 10)}</td>
                                <td >{v.status === 1 ?
                                    (
                                        <label className="badge badge-warning">Pending</label>
                                    ) : (v.status === 2 ?
                                        <label className="badge badge-success">Approved</label>
                                        : <label className="badge badge-danger">Rejected</label>)}
                                </td>
                                <td><button class="cancel-btn" onClick={() => deleteVacation(v.id)}><i class="fa fa-close"></i></button></td>
                            </tr>)
                            }
                        </tbody></table> : <div>
                        <p> <a href="/session"> Login</a> to see your Vacations</p>
                    </div>}
            </Row>


        </Aux>
    );

}

export default GoogleMap;