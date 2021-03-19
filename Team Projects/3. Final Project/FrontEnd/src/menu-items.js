// import React, { useState, useEffect, useContext } from 'react';
// import {NavLink} from 'react-router-dom';
// import UserContext from './providers/'
// import jwtDecode from 'jwt-decode';
// import './../../../assets/scss/style.scss';
// import Aux from "../../../hoc/_Aux";
// import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
// import DEMO from "../../../store/constant";
// import {BASE_URL} from '../../../common/constants'

// const SignUp1 = (props) => {

//     const history = props.history;
//     const location = props.location;

//     const userContext = useContext(UserContext);
//     const loggedUser = userContext.user;

//     const { setUser } = useContext(UserContext);


export default {
    items: [
        {
            id: 'navigation',
            title: 'Home',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Homepage',
                    type: 'item',
                    url: '/',
                    icon: 'feather icon-home',
                }
            ]
        },

        {

            id: 'ui-element',
            title: 'UI ELEMENT',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'auth',
                    title: 'Sign up',
                    type: 'collapse',
                    icon: 'feather icon-lock',
                    badge: {
                        title: 'more',
                        type: 'label-danger'
                    },
                    children: [
                        {
                            id: 'signup-1',
                            title: 'Sign up',
                            type: 'item',
                            // url: '/auth/signup-1',
                            url: '/admin/users',
                            target: true,
                            breadcrumbs: false
                        },
                        {
                            id: 'signin-1',
                            title: 'Sign in',
                            type: 'item',
                            // url: '/auth/signin-1',
                            url: '/session',
                            target: true,
                            breadcrumbs: false
                        }
                    ]
                },
                {
                    id: 'basic',
                    title: 'Office Workspace',
                    type: 'collapse',
                    icon: 'feather icon-box',
                    children: [
                        {
                            id: 'typography',
                            title: 'Your workspace',
                            type: 'item',
                            url: '/basic/typography'
                        }
                    ]
                }
            ]
        },
        {
            id: 'ui-forms',
            title: 'Forms & Tables',
            type: 'group',
            icon: 'icon-group',
            children: [

                {
                    id: 'bootstrap',
                    title: 'Office Members',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/tables/bootstrap'
                }
            ]
        },
        {
            id: 'chart-maps',
            title: 'Chart & Maps',
            type: 'group',
            icon: 'icon-charts',
            children: [
                {
                    id: 'charts',
                    title: 'Covid-19 Statistics',
                    type: 'item',
                    icon: 'feather icon-pie-chart',
                    url: '/covidData'
                },
                {
                    id: 'maps',
                    title: 'My Vacations',
                    type: 'item',
                    icon: 'feather icon-map',
                    url: '/maps/google-map'
                }
            ]
        },



    ]
}

