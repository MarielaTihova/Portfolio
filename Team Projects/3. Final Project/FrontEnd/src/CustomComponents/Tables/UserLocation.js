import React, { Component } from 'react'
import { ProgressBar } from 'react-bootstrap';
import Project from '../Projects/Project';


const BasicTable = (props) => {
    const users = props.users;
    return (

        <div>
            <div className="page-header">
                <h3 className="page-title"> People from your office </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>Tables</a></li>
                        <li className="breadcrumb-item active" aria-current="page">People from your office</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">

                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Personal Name</th>
                                            <th>Email</th>
                                            <th>Work status</th>
                                            <th>Project</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map(u => <tr>
                                            <td>{u.id} <img height="30px" width="30px" src={u.avatar} /></td>
                                            <td>{u.username}</td>
                                            <td>{u.personalName}</td>
                                            <td>{u.email}</td>
                                            <td>
                                                {/* {
                                                    ***** ADMIN *****
                                                    u.workStatus === 'Home' ? (
                                                        <label className="badge badge-warning">{u.workStatus}</label>
                                                    ) : (u.workStatus === 'Office' ?
                                                        <label className="badge badge-success">{u.workStatus}</label>
                                                        : <label className="badge badge-danger">{u.workStatus}</label>)
                                                } */}

                                                {

                                                    u.workStatus === 2 ? (
                                                        <label className="badge badge-warning">Home</label>
                                                    ) : (u.workStatus === 1 ?
                                                        <label className="badge badge-success">Office</label>
                                                        : <label className="badge badge-danger">Vacation</label>)
                                                }


                                            </td>

                                            <td> {u.project ? <Project project={u.project} /> : <div style={{ color: "red", fontWeight: "bold" }}>
                                                Unassigned</div>}</td>
                                        </tr>)}
                                    </tbody></table>
                            </div>
                        </div>
                    </div>
                </div></div></div >
    )

}

export default BasicTable;
