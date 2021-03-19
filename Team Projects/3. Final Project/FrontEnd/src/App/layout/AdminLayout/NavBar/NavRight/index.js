import React, { Component, useState, useContext, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';
import UserContext from '../../../../../providers/UserContext'
import { BASE_URL } from '../../../../../common/constants';
const NavRight = (props) => {
    // state = {
    //     listOpen: false
    // };

    const history = props.history;
    const location = props.location;

    const [listOpen, setListOpen] = useState(false);
    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;

    const [nextWeekInOffice, setNextWeekInOffice] = useState(false)



    console.log('Logged User', loggedUser);
    const { setUser } = userContext;

    const logout = () => {
        // if (!user.username) {
        //   return alert('Invalid username!');
        // }
        // if (!user.password) {
        //   return alert('Invalid password!');
        // }

        fetch(`${BASE_URL}/session`, {
            method: 'DELETE',
            // body: JSON.stringify(user),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            }
        })
            .then(r => r.json())
            .then(result => {
                console.log(result);
                if (result.error) {
                    return alert(result.message);
                }

                // try {
                //   const payload = jwtDecode(result.token);
                //   setUser(payload);
                // } catch (e) {
                //   return alert(e.message);
                // }

                localStorage.removeItem('token', result.token);
                setUser(null);
                history.push('/dashboard/default');
            })
            .catch(alert); // (...rest) => alert(...rest);
    };



    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/users/${loggedUser.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("request: ", result);
                    if ((result.error)) {
                        throw new Error(result.message);

                    } else {
                        setNextWeekInOffice(result);
                    }
                })
                .catch((error) => console.log(error.message))
        }
    }, []);


    return (
        <Aux>
            {loggedUser ?
                <div>
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <Dropdown alignRight={!props.rtlLayout}>
                                <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                    <i className="icon feather icon-bell" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight className="notification">
                                    <div className="noti-head">
                                        <h6 className="d-inline-block m-b-0">Notifications</h6>
                                        <div className="float-right">
                                            <a href={DEMO.BLANK_LINK} className="m-r-10">mark as read</a>
                                            <a href={DEMO.BLANK_LINK}>clear all</a>
                                        </div>
                                    </div>
                                    <ul className="noti-body">
                                        <li className="n-title">
                                            <p className="m-b-0">NEW</p>
                                        </li>
                                        <li className="notification">
                                            <div className="media">
                                                <img className="img-radius" src={Avatar1} alt="Generic placeholder" />
                                                <div className="media-body">
                                                    <p><strong>John Doe</strong><span className="n-time text-muted"><i
                                                        className="icon feather icon-clock m-r-10" />30 min</span></p>
                                                    <p>New ticket Added</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="n-title">
                                            <p className="m-b-0">EARLIER</p>
                                        </li>
                                        <li className="notification">
                                            <div className="media">
                                                <img className="img-radius" src={Avatar2} alt="Generic placeholder" />
                                                <div className="media-body">
                                                    <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                        className="icon feather icon-clock m-r-10" />30 min</span></p>
                                                    <p>Prchace New Theme and make payment</p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="notification">
                                            <div className="media">
                                                <img className="img-radius" src={loggedUser.avatar} alt="Generic placeholder" />
                                                <div className="media-body">
                                                    <p><strong>{loggedUser.personalName}</strong><span className="n-time text-muted"><i
                                                        className="icon feather icon-clock m-r-10" />30 min</span></p>
                                                    <p>currently login</p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="noti-footer">
                                        <a href={DEMO.BLANK_LINK}>show all</a>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

                        <li>
                            <Dropdown alignRight={!props.rtlLayout} className="drp-user">
                                <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                    <i className="fa fa-user" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu alignRight className="profile-notification">
                                    <div className="pro-head">
                                        <img src={loggedUser.avatar} className="img-radius" alt="User Profile" />
                                        <span>{loggedUser.personalName}</span>
                                        {/* Trqbva da e s button za da ne izliza undefiedn push */}
                                        <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout" >
                                            <i className="feather icon-log-out" onClick={logout} />
                                        </a>
                                    </div>
                                    <ul className="pro-body">

                                        {loggedUser.role === 'Admin' ?
                                            <div>
                                                <li><a href='/adminWorkspace' className="dropdown-item"><i className="fa fa-plus" /> New office</a></li>
                                                <li><a href='/vacations' className="dropdown-item"><i className="fa fa-map-o" /> Vacations</a></li>
                                                <li><a href="/projects" className="dropdown-item"><i className="fa fa-tasks" />Projects</a></li></div> : null}
                                        <li><a href='/profile' className="dropdown-item"><i className="feather icon-user" /> Profile</a></li>
                                        <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="fa fa-calendar" /> <b>Current week status: </b>
                                            {

                                                loggedUser.workStatus === 2 ? (
                                                    <label className="badge badge-warning">Home</label>
                                                ) : (loggedUser.workStatus === 1 ?
                                                    <label className="badge badge-success">Office</label>
                                                    : <label className="badge badge-danger">Vacation</label>)
                                            }</a></li>

                                        <li><a href={DEMO.BLANK_LINK} className="dropdown-item"><i className="fa fa-calendar" /> <b>Next week status:</b> {

                                            nextWeekInOffice == false ? (
                                                <label className="badge badge-warning">Home</label>
                                            ) : (nextWeekInOffice == true ?
                                                <label className="badge badge-success">Office</label>
                                                : <label className="badge badge-danger">Vacation</label>)
                                        } </a></li>
                                    </ul>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                    <ChatList listOpen={listOpen} closed={() => { setListOpen(listOpen = false); }} />
                </div>
                : null}
        </Aux>
    );
}


export default NavRight;
