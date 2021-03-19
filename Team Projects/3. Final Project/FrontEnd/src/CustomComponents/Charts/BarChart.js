import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { BASE_URL } from "../../common/constants";

class ChartsPage extends React.Component {
    fetchedData = this.getData();
    state = {
        dataBar: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Pink"],
            datasets: [
                {
                    label: "% of Votes",
                    data: [5, 4, 7, 8, 9, 25, 10],//this.fetchedData, //[12, 19, 3, 5, 2, 3], // put todayCases per country here
                    backgroundColor: [
                        "rgba(255, 134,159,0.4)",
                        "rgba(98,  182, 239,0.4)",
                        "rgba(255, 218, 128,0.4)",
                        "rgba(113, 205, 205,0.4)",
                        "rgba(170, 128, 252,0.4)",
                        "rgba(255, 177, 101,0.4)",
                        "rgba(235, 100, 161,0.4)",
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(98,  182, 239, 1)",
                        "rgba(255, 218, 128, 1)",
                        "rgba(113, 205, 205, 1)",
                        "rgba(170, 128, 252, 1)",
                        "rgba(255, 177, 101, 1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        barPercentage: 1,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    }

    getData() {
        fetch(`${BASE_URL}/covidData/USA`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    // setWorkspace(result);
                    this.setState({ databar: {} });
                    //this.fetchedData.push(result);
                    console.log("Result for graph", result);
                    // return result;
                }
            })
            .catch((error) => alert(error));
    }
    render() {
        return (
            <MDBContainer>
                <h3 className="mt-5">Bar chart</h3>
                <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
                <button onClick={() => this.getData()}>set State</button>
            </MDBContainer>
        );
    }
}

export default ChartsPage;