import React, { useState, useContext } from 'react'
import { createStandaloneToast, Button, Input } from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

function Register() {
  const { register } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    password: '',
  })
  const [invalidUser, isInvalidUser] = React.useState(false)
  const [invalidPassword, isInvalidPassword] = React.useState(false)
  const [validForm, isFormValid] = React.useState(false)

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

  const registerUser = () => {
    verifyForm()
    if (validForm === true) {
      register(registerInfo.username, registerInfo.password, (result) => {
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
            history.push('/')
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
              duration: 9000,
              isClosable: true,
            })
          }
        }
      })
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
