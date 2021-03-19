import React, { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import Aux from "../../../hoc/_Aux/index";
import LineChart from "./LineChart";
import BarDiscreteChart from "./BarDiscreteChart";
import MultiBarChart from "./MultiBarChart";
import PieBasicChart from "./PieBasicChart";
import PieDonutChart from "./PieDonutChart";
import BarChart2 from '../../../CustomComponents/Charts/BarChart2';
import UserContext from '../../../providers/UserContext';




const Nvd3Chart = (props) => {


    console.log("NVD3 Props", props);
    const countryName = props.match.params['countryName'];

    console.log("country Props", countryName);

    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    const country = loggedUser ? loggedUser.country.name : 'WORLD';
    return (
        <Aux>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Active cases (in millions)- {country}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <LineChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Daily cases for the last week- {country}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <BarDiscreteChart />
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Daily numbers - {country}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <MultiBarChart />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                    <Col md={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Last 7 days data</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">

                            </Card.Body>
                        </Card>
                        <BarChart2 />
                    </Col>
               </Row>*/}
        </Aux>
    );
}


export default Nvd3Chart;