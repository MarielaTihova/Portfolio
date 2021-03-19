import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import { withRouter } from 'react-router-dom';

const GridMatrix = (props) => {
    // const matrix = JSON.parse(props.matrix);
    // const changeElem = props.changeElem;

    return (
        <div className="matrix">
            GRID MATRIX
            <Container>
                <Row>
                    <Col>1 of 2</Col>
                    <Col>2 of 2</Col>
                </Row>
                <Row>
                    <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>
        </div>
    )


}

export default GridMatrix;