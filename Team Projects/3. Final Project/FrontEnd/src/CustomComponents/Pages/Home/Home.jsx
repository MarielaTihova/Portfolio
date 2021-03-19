// import React from "react";
//import { NavLink } from "react-router-dom";
// tuk shte sedi nov HomePage i ot tuk shte navigira kum drugiq ni register i login


import React, { useContext } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
// import { BrowserRouter as Router } from 'react-router-dom';
// import {
//   MDBNavbar,
//   MDBNavbarBrand,
//   MDBNavbarNav,
//   MDBNavItem,
//   MDBNavLink,
//   MDBNavbarToggler,
//   MDBCollapse,
//   MDBMask,
//   MDBRow,
//   MDBCol,
//   MDBFormInline,
//   MDBBtn,
//   MDBView,
//   MDBContainer,
//   MDBIcon
// } from 'mdbreact';
import './Home.css';
import UserContext from '../../../providers/UserContext';
// import AllBooks from '../../Books/AllBooks/AllBooks';
// import MultiCarouselPage from '../../Base/Carousel/Carousel';

const Home = () => {

  //   const [collapseID, setCollapseID] = useState(false);

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  //const [country, setCountry] = useState({});


  //   // handleTogglerClick = () => {
  //   //   const { collapsed } = this.state;
  //   //   this.setState({
  //   //     collapsed: !collapsed
  //   //   });
  //   // };

  //   useEffect(() => {
  //     document.querySelector("nav").style.height = "65px";
  //     return () => {
  //       document.querySelector("nav").style.height = "auto";
  //     };
  //   }, []);
  // //  const navStyle = (

  // //  <div 
  // //  navStyle={{ marginTop: '4rem' }}
  // //   />
  // //  )
  //   const overlay = (

  //     <div
  //       id="sidenav-overlay"
  //       role="presentation"
  //       // navStyle={{ marginTop: '4rem' }}
  //       style={{ backgroundColor: "transparent" }}
  //       onClick={() => handleTogglerClick("handleTogglerClick")}
  //     />
  //   );

  //   // render() {
  //   //   const { collapsed } = this.state;
  //   //   const navStyle = { marginTop: '4rem' };
  //   //   const overlay = (
  //   //     <div
  //   //       id='sidenav-overlay'
  //   //       style={{ backgroundColor: 'transparent' }}
  //   //       onClick={this.handleTogglerClick}
  //   //     />

  //       const handleTogglerClick = () => {
  //         setCollapseID(
  //           collapseID !== collapseID
  //         )
  //       }

  return (
    <div id='caltoaction'>

      <h1>Home</h1>
      <DropdownButton variant="danger" id="dropdown-basic-button" title="Choose country">
        <Dropdown.Item href="/workspaces">All Workspaces</Dropdown.Item>
        <Dropdown.Item href="/workspaces/USA">USA</Dropdown.Item>
        <Dropdown.Item href="/workspaces/Bulgaria">Bulgaria</Dropdown.Item>
        <Dropdown.Item href="/workspaces/France">France</Dropdown.Item>
        <Dropdown.Item href="/workspaces/Egypt">Egypt</Dropdown.Item>
      </DropdownButton>
    </div >

  );
}


export default Home;

















// const Home = () => {
//   return (
//     <div className="home">

//     </div>
//   );
// };
// export default Home;

// //Before
// <h2>Home</h2>
// <img className="card__image" src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2126&q=80" alt=""></img>
// <div className="navigation">
//   <NavLink to="/home">Home</NavLink>
// </div>