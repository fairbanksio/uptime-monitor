import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import FriendlyError from '../Util/FriendlyError'
import { Button, Input } from '@chakra-ui/react'
import { GoogleLogin } from 'react-google-login';

function Login() {
  const { login, loginGoogle, loading, error } = useContext(AuthContext)

  const history = useHistory()
  //const { user, loading, error, login, login, logout } = auth();

  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const loginUser = () => {
    login(loginInfo.username, loginInfo.password, (result) => {
      if (result.status === 'success') {
        history.push('/dashboard')
      }
    })
  }

  const handleGoogleSignIn = (response) => {
    loginGoogle(response, result => {
      if (result.status === 'success') {
        history.push('/dashboard')
      }
    });
  }

  const handleGoogleFailure = e => {
    console.log(e)
  }
 
  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <Input
            type="text"
            id="username"
            required
            value={loginInfo.username}
            onChange={handleInputChange}
            name="username"
            placeholder="username"
            size="md"
            width={'300'}
          />
        </div>
        <div className="form-group">
          <Input
            type="password"
            id="password"
            required
            value={loginInfo.password}
            onChange={handleInputChange}
            name="password"
            placeholder="password"
            size="md"
            width={'300'}
          />
        </div>
        <br />
        {loading ? (
          <>loading</>
        ) : (
          <Button onClick={loginUser} colorScheme="purple">
            Login
          </Button>
        )}
        <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT ? process.env.REACT_APP_GOOGLE_CLIENT : window.REACT_APP_GOOGLE_CLIENT}
              onSuccess={(response) => handleGoogleSignIn(response)}
              onFailure={(error) => console.log(error)}
              render={renderProps => (
                <Button

                  
                  onClick={renderProps.onClick} />
              )} />
        <br />
        {error && <FriendlyError error={error} />}
        <br />
      </div>
    </div>
  )
}

export default Login
