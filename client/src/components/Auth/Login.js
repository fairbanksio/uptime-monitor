import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Input } from '@chakra-ui/react'

import { AuthContext } from '../../contexts/AuthContext'
import FriendlyError from '../Util/FriendlyError'

function Login() {
  const { login, loading, error } = useContext(AuthContext)

  const history = useHistory()
  //const { user, loading, error, login, login, logout } = auth();

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
      if (result.status === 'success') {
        history.push('/dashboard')
      }
    })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <Input
            type="text"
            id="username"
            isRequired={true}
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
            isRequired={true}
            value={loginInfo.password}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
        <br />
        {error && <FriendlyError error={error} />}
        <br />
      </div>
    </div>
  )
}

export default Login
