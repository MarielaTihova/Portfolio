import React, { useState, useEffect, useContext } from 'react';
import NVD3Chart from 'react-nvd3';
import { BASE_URL } from '../../../common/constants';
import UserContext from '../../../providers/UserContext';


const MultiBarChart = () => {



    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
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

                        console.log("Graph result", result);

                        let sin = [],
                            sin2 = [],
                            sin3 = [];

                        const len = 80;//35 + (Math.random() * (70 - 35));
                        for (let i = result.length - 1; i >= 0; i--) {
                            console.log("result i", result[i]);
                            sin.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].todayCases
                            });
                            sin2.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].critical
                            });
                            sin3.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].todayDeaths
                            });
                        }
                        setGraphData([
                            {
                                values: sin,
                                key: 'New cases',
                                color: '#1de9b6'
                            },
                            {
                                values: sin3,
                                key: 'Deaths',
                                color: '#A389D4'
                            },
                            {
                                values: sin2,
                                key: 'Critical',
                                color: '#04a9f5',
                                area: true
                            }
                        ]);
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

                        console.log("Graph result", result);

                        let sin = [],
                            sin2 = [],
                            sin3 = [];

                        const len = 80;//35 + (Math.random() * (70 - 35));
                        for (let i = result.length - 1; i >= 0; i--) {
                            console.log("result i", result[i]);
                            sin.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].todayCases
                            });
                            sin2.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].critical
                            });
                            sin3.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': result[i].todayDeaths
                            });
                        }
                        setGraphData([
                            {
                                values: sin,
                                key: 'New cases',
                                color: '#1de9b6'
                            },
                            {
                                values: sin3,
                                key: 'Deaths',
                                color: '#A389D4'
                            },
                            {
                                values: sin2,
                                key: 'Critical',
                                color: '#04a9f5',
                                area: true
                            }
                        ]);
                    }
                })
                .catch((error) => alert(error));
        }
    }, []);

    const data = graphData;
    return <NVD3Chart type="multiBarChart" datum={data} x="x" y="y" height={300} showValues groupSpacing={0.2} />

}

export default MultiBarChart;