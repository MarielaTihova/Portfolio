import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../../providers/UserContext'
import jwtDecode from 'jwt-decode';
import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import DEMO from "../../../store/constant";
import { BASE_URL } from '../../../common/constants'

const SignUp1 = (props) => {

  const history = props.history;
  const location = props.location;

  const userContext = useContext(UserContext);
  const loggedUser = userContext.user;

  const { setUser } = useContext(UserContext);

  const [user, setUserObject] = useState({
    username: '',
    password: '',
    avatar: '',
  });

  const updateUser = (prop, value) => setUserObject({ ...user, [prop]: value });



  const isLogin = location.pathname.includes('login');
  const isLogout = location.pathname.includes('logout');

  const register = () => {
    if (!user.username) {
      return alert('Invalid username!');
    }
    if (!user.password) {
      return alert('Invalid password!');
    }

    fetch(`${BASE_URL}/admin/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        personalName: user.username,
        //  avatar: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F-PYTTTc2bV3g%2FVpmwl5GBdRI%2FAAAAAAAAWsk%2FcmTOUZVVgXU%2Fs1600%2FClassDojo%252Bmonster%252B33.png&f=1&nofb=1"
      }),
    })
      .then(r => r.json())
      .then(result => {
        console.log('result: ', result);
        if (result.error) {
          return alert(result.message);
        }

        history.push('/session');
      })
      .catch(alert);
  };

  function handleSubmit(event) {
    event.preventDefault();
  }


  return (
    <Aux>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <h3 className="mb-4">Sign up</h3>
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" value={user.username} onChange={(e) => updateUser('username', e.target.value)} />
              </div>
              <div className="input-group mb-4">
                <input type="text" className="form-control" placeholder="Personalname" value={user.personalName} onChange={(e) => updateUser('personalName', e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email" value={user.email} onChange={(e) => updateUser('email', e.target.value)} />
              </div>
              <div className="input-group mb-4">
                <input type="password" className="form-control" placeholder="password" value={user.password} onChange={(e) => updateUser('password', e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <input type="avatar" className="form-control" placeholder="Avatar" value={user.avatar} onChange={(e) => updateUser('avatar', e.target.value)} />
              </div>
              <div className="input-group mb-3">
                <input type="country" className="form-control" placeholder="Country" value={user.country} onChange={(e) => updateUser('country', e.target.value)} />
              </div>
              <div className="form-group text-left">
                <div className="checkbox checkbox-fill d-inline">
                  <input type="checkbox" name="checkbox-fill-2" id="checkbox-fill-2" />
                  <label htmlFor="checkbox-fill-2" className="cr">Send me the <a href={DEMO.BLANK_LINK}> Newsletter</a> weekly.</label>
                </div>
              </div>
              <button className="btn btn-primary shadow-2 mb-4" onClick={register}>Sign up</button>
              <p className="mb-0 text-muted">Allready have an account? <NavLink to="/session">Login</NavLink></p>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default SignUp1;