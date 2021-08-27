import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  createStandaloneToast,
  Button,
  FormControl,
  Input,
  Text,
} from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'

function Login() {
  const { login, loading, error } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const [loginInfo, setRegisterInfo] = useState({ username: '', password: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...loginInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginUser()
    }
  }

  const loginUser = () => {
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
