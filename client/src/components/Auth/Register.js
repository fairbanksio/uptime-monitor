import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { createStandaloneToast, Button, Input } from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'
import isValidEmail from '../../util/isValidEmail'

function Register() {
  const { register } = useContext(AuthContext)
  const toast = createStandaloneToast()
  const history = useHistory()

  const initRegisterInfo = {
    username: '',
    password: '',
    email: '',
  }
  const [registerInfo, setRegisterInfo] = useState(initRegisterInfo)

  const initFormValidation = {
    formErrors: {},
    usernameValid: null,
    emailValid: null,
    passwordValid: null
  }
  let [formValidation, setFormValidation] = useState(initFormValidation)
  let [formValid, setFormValid] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...registerInfo, [name]: value })
    validateField(name, value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      registerUser()
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
      case 'email':
        newFormValidation.emailValid = isValidEmail(value)
        newFormValidation.formErrors.email = newFormValidation.emailValid ? '' : ' you must enter a valid email';
        break;
      default:
        break;
    }

    setFormValidation({
      ...formValidation, ...newFormValidation
    });

  }

  const validateForm = () => {
    if(formValidation.usernameValid && formValidation.passwordValid && formValidation.emailValid){
        setFormValid(true)
    } else {
        setFormValid(false)
    } 
  }

  useEffect(() => {
    validateForm()
    //eslint-disable-next-line
  }, [formValidation])
  const registerUser = () => {
    if(formValid){
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
        isInvalid={!formValidation.usernameValid && formValidation.usernameValid !== null}
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
        isInvalid={!formValidation.emailValid && formValidation.emailValid !== null}
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
        isInvalid={!formValidation.passwordValid && formValidation.passwordValid !== null}
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
