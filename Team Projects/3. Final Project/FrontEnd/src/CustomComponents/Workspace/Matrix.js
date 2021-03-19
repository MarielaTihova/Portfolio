import React from 'react'
// import { BASE_URL } from '../../common/constants'
import PropTypes from 'prop-types'
// import Country from '../Country/Country';
import { Table } from 'react-bootstrap';

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

import './Matrix.css'
// import { withRouter } from 'react-router-dom';

const Matrix = (props) => {


  const cellClass = props.cellClass;
  const labelClass = props.labelClass;

  console.log("MATRIX props matrix", props.matrix);
  const matrix = JSON.parse(props.matrix);
  const req = props.req;
  //const newEl = props.newEl;
  // const changeElem = props.changeElem;
  const changeElem = (value, value2) => {
    console.log("Element 1", value);
    console.log("Element 2", value2);
    req(value, value2);
    // console.log("New El", newEl);
    //value = newEl;
  }
  // return (
  //   <div> TEXT</div>
  // )
  return (
    <div className="matrix">

      {/* <Table striped bordered hover variant="dark">
    
        <tbody>
          {matrix.map((row, index) => <tr key={index} >{row.map((el, index2) => <td key={index2} onClick={() => changeElem(index, index2)}>{el === 1 ? <img height="40px" width="40px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fstudent-desk-change-clipart-12.png&f=1&nofb=1" /> : "empty"} </td>)}</tr>)}


        </tbody>

      </Table> */}
      <MDBContainer>
        {matrix.map((row, index) => <MDBRow key={index} >{row.map((el, index2) => <MDBCol className={cellClass} key={index2} onClick={() => changeElem(index, index2)}> {el === -1 ? (<img height="40px" width="40px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipground.com%2Fimages%2Fstudent-desk-change-clipart-12.png&f=1&nofb=1" />) : (el === 0 ? "empty" : <label className={labelClass}>{el}</label>)} </MDBCol>)}</MDBRow>)}

      </MDBContainer>
    </div>
  )


}

Matrix.propTypes = {
  req: PropTypes.func,
}

export default Matrix;