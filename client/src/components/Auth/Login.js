import React, { useState, useContext, useEffect } from 'react'
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

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: ''
  })

  const initFormValidation = {
    formErrors: {},
    usernameValid: null,
    passwordValid: null
  }
  let [formValidation, setFormValidation] = useState(initFormValidation)
  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLoginInfo({ ...loginInfo, [name]: value })
    validateField(name, value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }

  const validateField = (fieldName, value) => {
    // get existing form errors
    let newFormValidation = formValidation
  
    // update validation errors 
    switch(fieldName) {
      case 'username':
        newFormValidation.usernameValid = value.length >= 6;
        newFormValidation.formErrors.username = newFormValidation.usernameValid ? '' : ' is too short';
        break;
      case 'password':
        newFormValidation.passwordValid = value.length >= 6
        newFormValidation.formErrors.password = newFormValidation.passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    setFormValidation({
      ...formValidation, ...newFormValidation
    });

  }

  const validateForm = () => {
    if(formValidation.usernameValid && formValidation.passwordValid){
        setFormValid(true)
    } else {
        setFormValid(false)
    } 
  }

  useEffect(() => {
    validateForm()
    //eslint-disable-next-line
  }, [formValidation])

  const loginUser = () => {
    if(formValid){
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
          isInvalid={!formValidation.usernameValid && formValidation.usernameValid !== null}
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
          isInvalid={!formValidation.passwordValid && formValidation.passwordValid !== null}
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
          <Button onClick={loginUser} colorScheme="purple" disabled={!formValid}>
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
