import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../providers/UserContext'
import { Row, Col, Card, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import Project from '../../CustomComponents/Projects/Project'
import BasicTable from '../../CustomComponents/Tables/UserLocation';
import { BASE_URL } from '../../common/constants';
import ShowProfile from '../../CustomComponents/Users/ShowProfile';

const BootstrapTable = (props) => {
    // const users = props.users;

    const [appUsers, setUsers] = useState([]);



    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    const country = loggedUser ? loggedUser.country.name : '';

   
    console.log('Logged user in The Table', loggedUser)

    useEffect(() => {
        if(loggedUser) {
        // fetch(`${BASE_URL}/admin/users/`)
        fetch(`${BASE_URL}/workspaces/${country}/employees`)
            .then((response) => response.json())
            .then((result) => {
                console.log("request: ", result);
                if ((result.error)) {
                    throw new Error(result.message);

                } else {
                    setUsers(result);
                    console.log('Show me all',result)
                    console.log('Logged user in The Table', loggedUser)
                }
            })
            .catch((error) => console.log(error.message))
        }
    }, []);


    return (




        <div>

            <BasicTable users={appUsers} />
            

        </div>
    )
}



export default BootstrapTable;