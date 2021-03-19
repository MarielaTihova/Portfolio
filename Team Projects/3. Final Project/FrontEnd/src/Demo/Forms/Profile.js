import React, { useState, useEffect, useContext } from 'react';


import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { BASE_URL } from '../../common/constants';
import UserContext from '../../providers/UserContext';
import ShowProfile from '../../CustomComponents/Users/ShowProfile';

const Profile = (props) => {
    // const users = props.users;

    const [appUsers, setUsers] = useState([]);


    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    useEffect(() => {

        fetch(`${BASE_URL}/admin/users/`)
            .then((response) => response.json())
            .then((result) => {
                console.log("request: ", result);
                if ((result.error)) {
                    throw new Error(result.message);

                } else {
                    setUsers(result);
                }
            })
            .catch((error) => console.log(error.message))
    }, []);


    return (




        <div>

            <ShowProfile />


        </div>
    )
}



export default Profile;

