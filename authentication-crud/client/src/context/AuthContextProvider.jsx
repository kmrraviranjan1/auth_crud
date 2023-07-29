import React, { createContext, useEffect, useState } from 'react'
import useToken from '../hooks/useToken'
export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [accessToken, setAccessToken] = useState({})
  const { token } = useToken()
  
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [token])

  const logoutUser = () => {
    sessionStorage.clear();
    setAccessToken(null)
  }

  const value = { isAuthenticated, logoutUser, user, setUser, accessToken, setAccessToken }
  
  return (
    <AuthContext.Provider value={value} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider