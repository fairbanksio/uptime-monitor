import React, { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import FriendlyError from '../Util/FriendlyError'
import { Button, Input } from '@chakra-ui/react'

function Login() {
  const { login, loading, error } = useContext(AuthContext)

  const history = useHistory()
  //const { user, loading, error, login, login, logout } = auth();

  const [loginInfo, setRegisterInfo] = useState({ username: '', password: '' })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setRegisterInfo({ ...loginInfo, [name]: value })
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
        <br />
        {error && <FriendlyError error={error} />}
        <br />
      </div>
    </div>
  )
}

export default Login
