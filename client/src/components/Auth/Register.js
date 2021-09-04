import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { createStandaloneToast, Button, Input } from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'
import isValidEmail from '../../util/isValidEmail'

function Register() {
  const { register } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
    email: '',
  })
  const [invalidUser, isInvalidUser] = React.useState(false)
  const [invalidEmail, isInvalidEmail] = React.useState(false)
  const [invalidPassword, isInvalidPassword] = React.useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...registerInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registerUser()
    }
  }

  const verifyForm = () => {
    if (registerInfo.username && registerInfo.username.length > 1) {
      isInvalidUser(false)
    } else isInvalidUser(true)
    if (
      registerInfo.email &&
      registerInfo.email.length > 1 &&
      isValidEmail(registerInfo.email)
    ) {
      isInvalidEmail(false)
    } else isInvalidEmail(true)
    if (registerInfo.password && registerInfo.password.length > 1) {
      isInvalidPassword(false)
    } else isInvalidPassword(true)
    if (
      invalidUser === false &&
      invalidEmail === false &&
      invalidPassword === false
    ) {
      return true
    } else {
      return false
    }
  }

  const registerUser = () => {
    if (
      verifyForm() &&
      registerInfo &&
      registerInfo.username.length > 1 &&
      registerInfo.email.length > 1 &&
      isValidEmail(registerInfo.email) &&
      registerInfo.password.length > 1
    ) {
      register(
        registerInfo.username,
        registerInfo.password,
        registerInfo.email,
        (result) => {
          if (result && result.status === 'success') {
            const id = 'register-success-toast'
            if (!toast.isActive(id)) {
              toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                variant: 'subtle',
                duration: 9000,
                isClosable: true,
              })
            }
            setTimeout(() => {
              history.push('/dashboard')
            }, 2000)
          } else {
            const id = 'register-error-toast'
            if (!toast.isActive(id)) {
              toast({
                id,
                title: 'An error occurred.',
                description: 'Unable to create user account.',
                status: 'error',
                variant: 'subtle',
                duration: 7000,
                isClosable: true,
              })
            }
          }
        }
      )
    } else {
      setTimeout(() => {
        isInvalidUser(false)
        isInvalidEmail(false)
        isInvalidPassword(false)
      }, 1200)
    }
  }

  return (
    <div>
      <Input
        type="text"
        id="username"
        required
        value={registerInfo.username}
        onChange={handleInputChange}
        name="username"
        placeholder="username"
        size="md"
        width={'300'}
        isInvalid={invalidUser}
      />
      <br />
      <Input
        type="text"
        id="email"
        required
        value={registerInfo.email}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="email"
        placeholder="email"
        size="md"
        width={'300'}
        isInvalid={invalidEmail}
      />
      <br />
      <Input
        type="password"
        id="password"
        required
        value={registerInfo.password}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        name="password"
        placeholder="password"
        size="md"
        width={'300'}
        isInvalid={invalidPassword}
      />

      <br />

      <Button onClick={registerUser} colorScheme="purple">
        Register
      </Button>

      <br />
      <br />
    </div>
  )
}

export default Register
