import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../../providers/UserContext'
import jwtDecode from 'jwt-decode';
import { BASE_URL } from '../../../common/constants'
import { NavLink } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";

const SignIn1 = (props) => {

  const history = props.history;
  const location = props.location;

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;
  console.log('Logged User', loggedUser);
  const { setUser } = userContext;

  const [user, setUserObject] = useState({
    username: '',
    password: '',
    email: '',
    nameField: '',
  });

  const updateUser = (prop, value) => setUserObject({ ...user, [prop]: value });

  const updateUserNameOrEmail = (value) => {
    if (value === { ...user }.email) {
      updateUser('email', value)
    }

    if (value === { ...user }.username) {
      updateUser('username', value)
    }
  }

  const isLogin = location.pathname.includes('login');
  const isLogout = location.pathname.includes('logout');


  const login = () => {
    if (!user.nameField) {
      return alert('Invalid username or email');
    }
    if (!user.password) {
      return alert('Invalid password!');
    }

    fetch(`${BASE_URL}/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(r => r.json())
      .then(result => {
        if (result.error) {
          return alert(result.message);
        }
        console.log('UserBody', user);

        try {
          const payload = jwtDecode(result.token);
          setUser(payload);
          console.log('LoggedUser PAYLOAD', payload);
        } catch (e) {
          return alert(e.message);
        }


        localStorage.setItem('token', result.token);
        history.push('/dashboard/default');
      })
      .catch(alert); // (...rest) => alert(...rest);
  };
  // console.log(loggedUser)

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
        setUser(null)
        history.push('/home');
      })
      .catch(alert); // (...rest) => alert(...rest);
  };





  function handleSubmit(event) {
    event.preventDefault();
  }



  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        {/* {isLogout ? logout() : null} */}
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            {/* <form onSubmit={handleSubmit}>
                        </form> */}

            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-unlock auth-icon" />
              </div>
              <h3 className="mb-4">Login</h3>
              <div className="input-group mb-3">
                <input /*type="email"*/ className="form-control" placeholder="Type username or email" /*value={ user.email || user.username}*/ onChange={(e) => updateUser('nameField', e.target.value)} />
              </div>
              {/* <div className="input-group mb-4">
                                    <input type="personalName" className="form-control" placeholder="Personalname"value={user.personalName} onChange={(e) => updateUser('personalName', e.target.value)}/>
                                </div> */}
              <div className="input-group mb-4">
                <input type="password" className="form-control" placeholder="password" value={user.password} onChange={(e) => updateUser('password', e.target.value)} />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                  <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                </div>
              </div>

              <button className="btn btn-primary shadow-2 mb-4" onClick={() => history.push('/default')}><i class="fa fa-arrow-left" aria-hidden="true"></i></button>

              <button className="btn btn-primary shadow-2 mb-4" onClick={login}>Login</button>

              <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password-1">Reset</NavLink></p>
              <p className="mb-0 text-muted">Don’t have an account? <NavLink to="/admin/users">Signup</NavLink></p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}


export default SignIn1;