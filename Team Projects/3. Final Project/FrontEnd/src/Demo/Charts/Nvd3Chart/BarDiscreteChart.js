import React, { useState, useEffect, useContext } from 'react';
import NVD3Chart from 'react-nvd3';
import { BASE_URL } from '../../../common/constants';
import UserContext from '../../../providers/UserContext';



const BarDiscreteChart = () => {



    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    console.log('Char USer ', loggedUser)
    const country = loggedUser ? loggedUser.country.name : '';

    const [countryName, setCountryName] = useState(country);
    const [graphData, setGraphData] = useState([]);
    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/covidData/${country}`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {
                        // console.log("SINGLE Workspace", result);
                        // setWorkspace(result);
                        const todayCasesArray = result.map(v => v.todayCases);
                        const datesArray = result.map(v => `${v.date.substring(8, 10)}.${v.date.substring(5, 7)}`);
                        //console.log("VAL", todayCasesArray);
                        // setValues(todayCasesArray);
                        setGraphData([{
                            key: "Cumulative Return",
                            values: [{
                                "label": datesArray[6],
                                "value": todayCasesArray[6],
                                "color": "#a389d4"
                            },
                            {
                                "label": datesArray[5],
                                "value": todayCasesArray[5],
                                "color": "#69CEC6"
                            },
                            {
                                "label": datesArray[4],
                                "value": todayCasesArray[4],
                                "color": "#4C5667"
                            },
                            {
                                "label": datesArray[3],
                                "value": todayCasesArray[3],
                                "color": "#1de9b6"
                            },
                            {
                                "label": datesArray[2],
                                "value": todayCasesArray[2],
                                "color": "#ff8a65"
                            },
                            {
                                "label": datesArray[1],
                                "value": todayCasesArray[1],
                                "color": "#04a9f5"
                            },
                            {
                                "label": datesArray[0],
                                "value": todayCasesArray[0],
                                "color": "#3ebfea"
                            },
                            ]
                        }
                        ])
                    }
                })
                .catch((error) => alert(error));
        }
    }, []);


    useEffect(() => {
        if (!loggedUser) {
            fetch(`${BASE_URL}/covidData/World`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {
                        // console.log("SINGLE Workspace", result);
                        // setWorkspace(result);
                        const todayCasesArray = result.map(v => v.todayCases);
                        const datesArray = result.map(v => `${v.date.substring(8, 10)}.${v.date.substring(5, 7)}`);
                        //console.log("VAL", todayCasesArray);
                        // setValues(todayCasesArray);
                        setGraphData([{
                            key: "Cumulative Return",
                            values: [{
                                "label": datesArray[6],
                                "value": todayCasesArray[6],
                                "color": "#a389d4"
                            },
                            {
                                "label": datesArray[5],
                                "value": todayCasesArray[5],
                                "color": "#69CEC6"
                            },
                            {
                                "label": datesArray[4],
                                "value": todayCasesArray[4],
                                "color": "#4C5667"
                            },
                            {
                                "label": datesArray[3],
                                "value": todayCasesArray[3],
                                "color": "#1de9b6"
                            },
                            {
                                "label": datesArray[2],
                                "value": todayCasesArray[2],
                                "color": "#ff8a65"
                            },
                            {
                                "label": datesArray[1],
                                "value": todayCasesArray[1],
                                "color": "#04a9f5"
                            },
                            {
                                "label": datesArray[0],
                                "value": todayCasesArray[0],
                                "color": "#3ebfea"
                            },
                            ]
                        }
                        ])
                    }
                })
                .catch((error) => alert(error));
        }
    }, []);

    return <NVD3Chart tooltip={{ enabled: true }} type="discreteBarChart" datum={graphData} x="label" y="value" height={300} showValues />

}

export default BarDiscreteChart;