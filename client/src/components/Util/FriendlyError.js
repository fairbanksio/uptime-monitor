import React, { useState, useEffect } from 'react'

export default function FriendlyError({ error }) {
  const [message, setMessage] = useState('undefined')

  useEffect(() => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          setMessage('Authentication Failed')
          break
        default:
          setMessage('There was a problem completing the request')
          break
      }
      if (error.response.data) {
        //error.response.data may contain useful details from api
        if (error.response.data.msg) {
          setMessage(error.response.data.msg)
        }
      }
    } else {
      setMessage('No response from server')
    }
  }, [error])

  return <div>{message}</div>
}

export function friendlyToast(error) {
  if (error) {
    if (error.response) {
      if (error.response.data) {
        //error.response.data may contain useful details from api
        if (error.response.data.msg) {
          return error.response.data.msg
        }
      }
      switch (error.response.status) {
        case 401:
          return 'Authentication Failed'
        case 422:
          return 'Double check all input and try again'
        default:
          return 'The api failed to complete the desired action'
      }
    } else {
      return 'Could not communicate with the server'
    }
  }
}
