import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';
import usersIcon from '../../assets/images/user/users-icon.jpg';

import { BASE_URL } from '../../common/constants'
import UserContext from '../../providers/UserContext';


const Dashboard = () => {


    const userContext = useContext(UserContext);
    const loggedUser = userContext.user;
    const countryData = loggedUser ? loggedUser.country.name : 'World'

    const [countryName, setCountryName] = useState(countryData);
    const [cases, setCases] = useState(0);
    const [testsPerMil, setTestsperMil] = useState(0);
    const [casesPerOneMilion, setCasesPerOneMilion] = useState(0);
    const [recovered, setRecovered] = useState(0);
    const [currDate, setDate] = useState('');

    const [peopleInOffice, setPeopleInOffice] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState([]);

    const [homeOfficePeople, setHomeOfficePeople] = useState([]);
    const [onVacation, setOnVacation] = useState([]);

    const [numProjects, setNumProjects] = useState(0);

    useEffect(() => {
        // if (loggedUser) {
        fetch(`${BASE_URL}/covidData/${countryName}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                    //console.log("err message", result.error);
                } else {
                    // console.log("SINGLE Workspace", result);
                    // setWorkspace(result);
                    setCases(result[0].cases);
                    //  setTodayCases(result[0].todayCases)
                    setCasesPerOneMilion(result[0].casesPerOneMillion);
                    setTestsperMil(result[0].testsPerOneMillion);
                    setRecovered(result[0].recovered);
                    setDate(`${result[0].date.substring(8, 10)}.${result[0].date.substring(5, 7)}`)
                    // const todayCasesArray = result.map(v => v.todayCases);
                    // const datesArray = result.map(v => v.date.substring(0, 10));
                    //console.log("VAL", todayCasesArray);
                    // setValues(todayCasesArray);

                }
            })
            .catch((error) => alert(error));
        //  }
    }, []);


    useEffect(() => {
        if (loggedUser) {
            fetch(`${BASE_URL}/workspaces/${countryData}/employeesInOffice`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {
                        setPeopleInOffice(result);

                    }
                })
                .catch((error) => alert(error));
        }
    }, []);

    useEffect(() => {
        const home = [];
        const vacation = [];
        if (loggedUser) {
            fetch(`${BASE_URL}/workspaces/${countryData}/employees`)
                .then((response) => response.json())
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                        //console.log("err message", result.error);
                    } else {
                        setTotalEmployees(result);
                        console.log('ALL empl', result);
                        result.forEach(r => {
                            if (r.workStatus == 2) {
                                // console.log("This one is home");
                                home.push(r);
                            }
                            else if (r.workStatus == 3) {
                                //console.log("This one is on VACATION");
                                vacation.push(r);
                            }
                        })

                        setHomeOfficePeople(home);
                        setOnVacation(vacation);



                        const projectIds = [];;
                        result.forEach(empl => {
                            if (!empl.project) {
                                console.log("No proj")
                            }
                            else if (empl.project) {
                                //if (empl.project.id) {
                                console.log("proj", empl.project.id);
                                if (!projectIds.includes(empl.project.id)) {
                                    projectIds.push(empl.project.id);
                                }

                                //}

                            }
                        });
                        // let set = new Set(projectIds);
                        console.log("project IDs", projectIds);
                        setNumProjects(projectIds.length);
                        // console.log("sets", set);
                    }
                })
                .catch((error) => alert(error));
        }
    }, []);


    console.log('vacation', onVacation);
    console.log('home', homeOfficePeople);
    console.log(' People in office', peopleInOffice);
    const tabContent = (
        <Aux>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Silje Larsen</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3784</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Julie Vad</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />3544</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Storm Hanse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />2739</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Frida Thomse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />1032</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Silje Larsen</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-up f-22 m-r-10 text-c-green" />8750</span>
                </div>
            </div>
            <div className="media friendlist-box align-items-center justify-content-center">
                <div className="m-r-10 photo-table">
                    <a href={DEMO.BLANK_LINK}><img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" /></a>
                </div>
                <div className="media-body">
                    <h6 className="m-0 d-inline">Storm Hanse</h6>
                    <span className="float-right d-flex  align-items-center"><i className="fa fa-caret-down f-22 m-r-10 text-c-red" />8750</span>
                </div>
            </div>
        </Aux>
    );



    return (
        <Aux>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Total Cases</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> {countryName}</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">{cases}</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '50%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Cases per 1 million</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> {casesPerOneMilion}</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">{((casesPerOneMilion / 1000000) * 100).toFixed(2)}%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{ width: '35%' }} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>Tests per 1 million</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> {testsPerMil}</h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">{((testsPerMil / 1000000) * 100).toFixed(2)}%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{ width: '70%' }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={8}>
                    <Card className='Recent-Users'>

                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>

                                <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={usersIcon} alt="activity-user" /></td>
                                        <td>
                                            <h4 className="mb-1"><b>In Your Office Now</b></h4>
                                            <p className="m-0"><b>Employees that are currently working onsite.</b> </p>
                                        </td>

                                        <td><a href="/tables/bootstrap" className="label theme-bg2 text-white f-12">All Office Members</a></td>
                                    </tr>

                                    {peopleInOffice.map(person => <tr className="unread">
                                        <td><img className="rounded-circle" style={{ width: '40px' }} src={person.avatar} alt="activity-user" /></td>
                                        <td>
                                            <h6 className="mb-1">{person.personalName}</h6>
                                            <p className="m-0">{person.username}…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15" />{person.email}</h6>
                                        </td>
                                        <td><div style={{ textAlign: 'center' }} className="label theme-bg text-white f-12">Office</div></td>
                                    </tr>)}


                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                {loggedUser ?
                    <Col md={6} xl={4}>
                        <Card className='card-event'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                        <h5 className="m-0">Recovered</h5>
                                    </div>
                                    <div className="col-auto">
                                        <label className="label theme-bg2 text-white f-14 f-w-400 float-right">{currDate}</label>
                                    </div>
                                </div>
                                <h2 className="mt-2 f-w-300">{recovered}<sub className="text-muted f-14"></sub></h2>
                                <h6 className="text-muted mt-3 mb-0">Recovered people up to this date </h6>
                                <i className="fa fa-heartbeat text-c-purple f-50" />
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="fa fa-users f-30 text-c-blue" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{totalEmployees.length}</h3>
                                        <span className="d-block text-uppercase">employees in this country</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-map-pin f-30 text-c-green" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{peopleInOffice.length}</h3>
                                        <span className="d-block text-uppercase">On site now</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="fa fa-home f-30 text-c-green" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{homeOfficePeople.length}</h3>
                                        <span className="d-block text-uppercase">Home Office</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="fa fa-user-secret f-30 text-c-green" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{onVacation.length}</h3>
                                        <span className="d-block text-uppercase">On Vacation</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className='border-bottom'>
                                <div className="row d-flex align-items-center">
                                    <div className="col-auto">
                                        <i className="feather icon-zap f-30 text-c-purple" />
                                    </div>
                                    <div className="col">
                                        <h3 className="f-w-300">{numProjects}</h3>
                                        <span className="d-block text-uppercase">Total projects in this country</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    : null}

            </Row>
        </Aux>
    );
}

export default Dashboard;