import React, { createContext, useEffect, useMemo, useState } from 'react'

import axiosClient from '../http-common'
import useIsMountedRef from '../util/isMountedRef'

import authService from '../services/auth'
import userService from '../services/user'
export const AuthContext = createContext()
export const AuthConsumer = AuthContext.Consumer

const AuthProvider = (props) => {
  const isMountedRef = useIsMountedRef()
  const [user, setUser] = useState(false)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)

  // get data of current authed user
  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      userService
        .getCurrentUser()
        .then((user) => {
          if (isMountedRef.current) {
            setUser(user.data)
          }
        })
        .catch((_error) => {})
        .finally(() => {
          if (isMountedRef.current) {
            setLoadingInitial(false)
          }
        })
    } else {
      if (isMountedRef.current) {
        setLoadingInitial(false)
      }
    }
  }, [isMountedRef])

  // login
  const login = (username, password, cb) => {
    setError(undefined)
    setLoading(true)
    authService
      .login(username, password)
      .then((user) => {
        setUser(user.data)
        localStorage.setItem('jwtToken', user.data.token)
        axiosClient.defaults.headers.common = {
          authorization: 'jwt ' + localStorage.getItem('jwtToken'),
        }
        cb({ result: user.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // register
  const register = (username, password, cb) => {
    setError(undefined)
    setLoading(true)
    userService
      .register(username, password)
      .then((user) => {
        cb({ result: user.data, status: 'success' })
      })
      .catch((error) => {
        setError(error)
        cb({ result: error, status: 'failure' })
      })
      .finally(() => setLoading(false))
  }

  // logout
  const logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    delete axiosClient.defaults.headers.common['Authorization']
    setUser(undefined)
    //authService.logout().then(); not yet implemented on api
  }

  // useMemo for peformance/rendering
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
    }), // eslint-disable-next-line
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && props.children}
    </AuthContext.Provider>
  )
}
export default AuthProvider
