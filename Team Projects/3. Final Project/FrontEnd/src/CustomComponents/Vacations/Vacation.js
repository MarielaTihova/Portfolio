import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import { BASE_URL } from '../../common/constants';
import '../../../src/Demo/Maps/Vacations.css';

const Vacations = () => {

    const [vacations, setVacations] = useState([]);


    useEffect(() => {
        fetch(`${BASE_URL}/vacations`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    console.log("vacations", result);
                    setVacations(result);
                }
            })
            .catch((error) => alert(error));
    }, []);

    const approve = (vacationId) => {
        fetch(`${BASE_URL}/vacations/${vacationId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    // const newVacations = vacations;

                    const newVacations = vacations.map(v => {
                        if (v.id === vacationId) {
                            v = result;
                        }

                        return v;
                    });

                    setVacations(newVacations);
                }
            })
            .catch((error) => alert(error));
    }


    const reject = (vacationId) => {
        fetch(`${BASE_URL}/vacations/${vacationId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    // const newVacations = vacations;

                    const newVacations = vacations.map(v => {
                        if (v.id === vacationId) {
                            v = result;
                        }

                        return v;
                    });

                    setVacations(newVacations);
                }
            })
            .catch((error) => alert(error));
    }

    return (
        <Aux>

            <Row>

                <table className="table">
                    <thead id="header">
                        <tr className="table-data">
                            <th>No</th>
                            <th>Requested by</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Reject</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {vacations.map((v, index) => <tr key={index} className={index % 2 === 0 ? 'even-third' : 'odd-third'}>
                            <td >{index + 1}</td>
                            <td >{v.user.username}</td>
                            <td >{v.startDate.substring(0, 10)}</td>
                            <td>{v.endDate.substring(0, 10)}</td>
                            <td >{v.status === 1 ?
                                (
                                    <label className="badge badge-warning">Pending</label>
                                ) : (v.status === 2 ?
                                    <label className="badge badge-success">Approved</label>
                                    : <label className="badge badge-danger">Rejected</label>)}
                            </td>

                            <td>{v.status === 2 || v.status === 1 ? <button className="cancel-btn" onClick={() => reject(v.id)}><i class="fa fa-close"></i></button> : null}</td>

                            <td>{v.status === 3 || v.status === 1 ? <button className="assign-btn" onClick={() => approve(v.id)}><i class="fa fa-check" aria-hidden="true"></i></button> : null}</td>
                        </tr>)
                        }
                    </tbody></table>
            </Row>


        </Aux>
    )
}

export default Vacations;