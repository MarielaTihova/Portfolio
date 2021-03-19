import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../common/constants';
import Workspace from './workspace';

const AllWorkspaces = (props) => {

    const [workspaces, setWorkspaces] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/workspaces`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                } else {
                    console.log("WORKSPACE", result);
                    setWorkspaces(result)
                }
            })
            .catch((error) => alert(error));
    }, []);

    // console.log('Show work spaces', workspaces);

    // const changeElem = (matrixElem, newValue) => {
    //     //matrixElem=newValue;
    //     matrixElem[0][0] = newValue;
    //     console.log(matrixElem[0][0]);
    //     console.log(newValue);
    // }
    return (

        <div>

            <h1>{workspaces.map((w, index) => <div key={index}><Workspace workspace={w} /></div>)}</h1>
        </div>
    )
}

export default AllWorkspaces;
