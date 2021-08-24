import React, { useState } from 'react'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'

function Homepage(props) {
  const [login, setLogin] = useState(true)
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Uptime monitor
        </a>
        <hr width={'300'} />
        {login ? <Login /> : <Register />}
        <hr width={'300'} />
        <span
          style={{ fontSize: '14px' }}
          onClick={(e) => {
            setLogin(!login)
          }}
          className="btn btn-success"
        >
          Click here to {!login ? 'login' : 'register'}
        </span>
      </header>
    </div>
  )
}
export default Homepage
