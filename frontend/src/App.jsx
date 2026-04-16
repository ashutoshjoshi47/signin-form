import React, { useEffect, useState } from 'react'
import Login from './Components/login'
import Home from './Components/Home'
import { ToastContainer } from 'react-toastify'

export const backendUrl = "http://localhost:8000"


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <Home setToken={setToken} />
      )}
    </div>
  )
}

export default App


