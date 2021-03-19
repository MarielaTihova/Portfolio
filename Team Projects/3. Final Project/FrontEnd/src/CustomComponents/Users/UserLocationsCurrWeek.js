import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
import UserContext from '../../providers/UserContext';
import './User2.css';
import User2 from './User2';
import "./ShowProfile.css"
import TableUserLocationsCurrWeek from './TableUserLocationsCurrWeek';
import BasicTable from '../Tables/UserLocation';

const UserLocationsCurrWeek = (props) => {
    //const id = props.match.params['id'];
    // const path = props.location.pathname;
    // console.log("props", props);
    const [appUsers, setUsers] = useState([]);



    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    useEffect(() => {

        fetch(`${BASE_URL}/admin/users/`)
            .then((response) => response.json())
            .then((result) => {
                //  console.log("request: ", result);
                if ((result.error)) {
                    throw new Error(result.message);

                } else {
                    setUsers(result);
                }
            })
            .catch((error) => console.log(error.message))
    }, []);



    return (
        <div className="ShowProfile">
            {/*appUsers.map(u => <User2 user={u} />)*/}

            {/*appUsers.map(u => <div>{<img height="30px" width="30px" src={u.avatar} />}{u.personalName} - {u.workStatus}<button onClick={() => { }}>Show profile</button></div>)*/}
            <BasicTable users={appUsers} />


        </div >
    )
};



export default UserLocationsCurrWeek;
