import React, { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import {Link} from 'react-router-dom';

function Register() {
   const auth = useContext(AuthContext)
   const history = useHistory();
  //const { user, loading, error, login, register, logout } = auth();

  const [registerInfo, setRegisterInfo] = useState({username: "", password: ""});

  const handleInputChange = event => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const registerUser = () => {
    auth.register(registerInfo.username, registerInfo.password, result => {
      if(result.status === "success"){
        history.push("/login")
      }
    })
  };

  return (
      <div className="submit-form">
        Register
        <div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={registerInfo.username}
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
              value={registerInfo.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>

          <button onClick={registerUser} className="btn btn-success">
            Submit
          </button>

          <br />
          <Link to="/login">Click here to login</Link>
        </div>
    </div>
  );
}

export default Register;