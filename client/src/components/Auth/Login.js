import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";

import {Link} from 'react-router-dom';

function Login() {
   const auth = useContext(AuthContext)
  //const { user, loading, error, login, login, logout } = auth();

  const [loginInfo, setRegisterInfo] = useState({username: "", password: ""});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegisterInfo({ ...loginInfo, [name]: value });
  };

  const loginUser = () => {
    auth.login(loginInfo.username, loginInfo.password)
  };

  return (
    <div className="submit-form">
      Login
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={loginInfo.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={loginInfo.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={loginUser} className="btn btn-success">
            Submit
          </button>
          <br />
          <Link to="/register">Click here to register</Link>
        </div>
    </div>

  );
}

export default Login;