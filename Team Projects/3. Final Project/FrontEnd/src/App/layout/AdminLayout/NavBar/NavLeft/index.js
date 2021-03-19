import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import windowSize from 'react-window-size';

import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";
import * as actionTypes from "../../../../../store/actions";
import { BASE_URL } from '../../../../../common/constants';
import UserContext from '../../../../../providers/UserContext';

import './NavLeft.css';
const NavLeft = (props) => {

    let iconFullScreen = ['feather'];
    iconFullScreen = (props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

    let navItemClass = ['nav-item'];
    if (props.windowWidth <= 575) {
        navItemClass = [...navItemClass, 'd-none'];
    }
    let dropdownRightAlign = false;
    if (props.rtlLayout) {
        dropdownRightAlign = true;
    }


    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    // const country = loggedUser ? loggedUser.country.name : '';

    // const [countryName, setCountryName] = useState(country);

    const [countries, setCountries] = useState([]);
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/countries`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {

                    setCountries(result);
                }
            })
            .catch((error) => alert(error));
    }, []);

    useEffect(() => {
        fetch(`${BASE_URL}/workspaces`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {

                    console.log("WS WS", result);
                    setWorkspaces(result);
                }
            })
            .catch((error) => alert(error));
    }, []);

    return (
        <Aux>
            <ul className="navbar-nav mr-auto">
                <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                <li className={navItemClass.join(' ')}>
                    <Dropdown alignRight={dropdownRightAlign}>
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            Other office workspaces
                            </Dropdown.Toggle>
                        <ul>
                            <Dropdown.Menu>

                                {workspaces.map(w => <Dropdown.Item href={`workspaces/${w.country.name}`}>{w.country.name} </Dropdown.Item>)}


                            </Dropdown.Menu>
                        </ul>
                    </Dropdown>
                </li>

                <li className={navItemClass.join(' ')}>
                    <Dropdown alignRight={dropdownRightAlign}>
                        <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            Covid data per country
                            </Dropdown.Toggle>
                        <ul>
                            <Dropdown.Menu>

                                {countries.map(c => <Dropdown.Item href={`data/${c.name}`}>{c.name} </Dropdown.Item>)}



                            </Dropdown.Menu>
                        </ul>
                    </Dropdown>
                </li>
                <li className="nav-item"><NavSearch /></li>
            </ul>
        </Aux>
    );

}

const mapStateToProps = state => {
    return {
        isFullScreen: state.isFullScreen,
        rtlLayout: state.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
