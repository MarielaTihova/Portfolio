import React, { useEffect, useContext, useState } from 'react';
import NVD3Chart from 'react-nvd3';
import { BASE_URL } from '../../../common/constants';
import UserContext from '../../../providers/UserContext';


const LineChart = () => {

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    const country = loggedUser ? loggedUser.country.name : '';

    const [countryName, setCountryName] = useState(country);
    const [graphData, setGraphData] = useState([]);

    const [worldData, setWorldData] = useState([]);
    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/covidData/${country}`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {

                        console.log("LINE chart", result);

                        var sin2 = [];
                        for (let i = result.length - 1; i >= 0; i--) {
                            sin2.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': (result[i].active / 1000000).toFixed(2)
                            });
                        }
                        setGraphData([
                            {
                                values: sin2,
                                key: 'Active cases',
                                color: '#1de9b6',
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

                        console.log("LINE chart", result);

                        var sin2 = [];
                        for (let i = result.length - 1; i >= 0; i--) {
                            sin2.push({
                                'x': `${result[i].date.substring(8, 10)}.${result[i].date.substring(5, 7)}`,
                                'y': (result[i].active / 1000000).toFixed(2)
                            });
                        }
                        setWorldData([
                            {
                                values: sin2,
                                key: 'Active cases',
                                color: '#1de9b6',
                                area: true
                            }
                        ]);

                    }
                })
                .catch((error) => alert(error));
        }
    }, []);

    const data = loggedUser ? graphData : worldData;
    return (
        <div>
            {
                React.createElement(NVD3Chart, {
                    xAxis: {
                        tickFormat: function (d) { return d; },
                        axisLabel: 'Last 7 days'
                    },
                    yAxis: {
                        axisLabel: 'Millions of active cases',
                        tickFormat: function (d) { return parseFloat(d).toFixed(2); }
                    },
                    type: 'lineChart',
                    datum: data,
                    x: 'x',
                    y: 'y',
                    height: 300,
                    renderEnd: function () {
                        console.log('renderEnd');
                    }
                })
            }
        </div>
    )
}


export default LineChart;