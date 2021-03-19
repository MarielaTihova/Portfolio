import React from 'react'
// import { BASE_URL } from '../../common/constants'
import PropTypes from 'prop-types'
// import Country from '../Country/Country';
import { Table } from 'react-bootstrap';
import Project from '../Projects/Project';
// import { withRouter } from 'react-router-dom';

const TableUserLocationsCurrWeek = (props) => {

    const users = props.users;
    return (

        <Table striped bordered hover>
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
                    <td>{u.workStatus}</td>
                    <td><Project project={u.project} /> </td>
                </tr>)}
            </tbody>
        </Table>
    )
}

TableUserLocationsCurrWeek.propTypes = {
    users: PropTypes.array,
}

export default TableUserLocationsCurrWeek;