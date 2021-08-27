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

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...registerInfo, [name]: value })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registerUser()
    }
  }

  const registerUser = () => {
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
