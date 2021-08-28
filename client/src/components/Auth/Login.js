import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  createStandaloneToast,
  Button,
  FormControl,
  Input,
} from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'

function Login() {
  const { login, loading } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const [loginInfo, setRegisterInfo] = useState({ username: '', password: '' })
  const [invalidUser, isInvalidUser] = React.useState(false)
  const [invalidPassword, isInvalidPassword] = React.useState(false)
  const [validForm, isFormValid] = React.useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...loginInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }

  const verifyForm = () => {
    isFormValid(false) // Reset the state for people having to retry
    if (loginInfo.username && loginInfo.username.length > 1) {
      isInvalidUser(false)
    } else isInvalidUser(true)
    if (loginInfo.password && loginInfo.password.length > 1) {
      isInvalidPassword(false)
    } else isInvalidPassword(true)
    if (invalidUser === false && invalidPassword === false) {
      isFormValid(true)
    }
  }

  const loginUser = () => {
    verifyForm()
    if (validForm === true) {
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

  return (
    <div className="submit-form">
      <FormControl id="username" isRequired>
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
      <FormControl id="password" isRequired>
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
          <br />
        </div>
      )}
    </div>
  )
}

export default Login
