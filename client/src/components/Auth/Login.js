import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import FriendlyError from '../Util/FriendlyError'
import {
  Button,
  Input,
  createStandaloneToast,
  FormControl,
} from '@chakra-ui/react'
import { GoogleLogin } from 'react-google-login'
import { AuthContext } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

function Login() {
  const { login, loginGoogle, loading, error } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' })
  const [invalidUser, isInvalidUser] = React.useState(false)
  const [invalidPassword, isInvalidPassword] = React.useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }

  const verifyForm = () => {
    if (loginInfo.username && loginInfo.username.length > 1) {
      isInvalidUser(false)
    } else isInvalidUser(true)
    if (loginInfo.password && loginInfo.password.length > 1) {
      isInvalidPassword(false)
    } else isInvalidPassword(true)
    if (invalidUser === false && invalidPassword === false) {
      return true
    } else {
      return false
    }
  }

  const loginUser = () => {
    if (
      verifyForm() &&
      loginInfo &&
      loginInfo.username.length > 1 &&
      loginInfo.password.length > 1
    ) {
      login(loginInfo.username, loginInfo.password, (result) => {
        if (result && result.status === 'success') {
          const id = 'logged-in-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'Logged in.',
              description: 'Welcome back!',
              status: 'success',
              variant: 'subtle',
              duration: 1500,
              isClosable: true,
            })
          }
          setTimeout(() => {
            history.push('/dashboard')
          }, 2500)
        } else {
          const id = 'login-error-toast'
          if (!toast.isActive(id)) {
            toast({
              id,
              title: 'An error occurred.',
              description: 'Unable to login with provided credentials.',
              status: 'error',
              variant: 'subtle',
              duration: 7000,
              isClosable: true,
            })
          }
        }
      })
    } else {
      setTimeout(() => {
        isInvalidUser(false)
        isInvalidPassword(false)
      }, 1200)
    }
  }

  const handleGoogleSignIn = (response) => {
    loginGoogle(response, (result) => {
      if (result.status === 'success') {
        history.push('/dashboard')
      }
    })
  }

  return (
    <div className="submit-form">
      <FormControl id="username">
        <Input
          type="text"
          id="username"
          value={loginInfo.username}
          onChange={handleInputChange}
          name="username"
          placeholder="username"
          size="md"
          width={'300'}
          isInvalid={invalidUser}
        />
      </FormControl>
      <FormControl id="password">
        <Input
          type="password"
          id="password"
          value={loginInfo.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          name="password"
          placeholder="password"
          size="md"
          width={'300'}
          isInvalid={invalidPassword}
        />
      </FormControl>

      {loading ? (
        <div>
          <Button disabled colorScheme="grey">
            Loading...
          </Button>
          <br />
          <br />
        </div>
      ) : (
        <div>
          <Button onClick={loginUser} colorScheme="purple">
            Login
          </Button>
          <br />
          <GoogleLogin
            clientId={
              process.env.REACT_APP_GOOGLE_CLIENT
                ? process.env.REACT_APP_GOOGLE_CLIENT
                : window.REACT_APP_GOOGLE_CLIENT
            }
            onSuccess={(response) => handleGoogleSignIn(response)}
            onFailure={(error) => console.log(error)}
            render={(renderProps) => (
              <Button onClick={renderProps.onClick} color="black">
                <FontAwesomeIcon
                  icon={faGoogle}
                  className="header-logo"
                  size="lg"
                />
                Login with Google
              </Button>
            )}
          />

          <br />
          <div>{error ? <FriendlyError error={error} /> : null}</div>
          <br />
        </div>
      )}
    </div>
  )
}

export default Login
