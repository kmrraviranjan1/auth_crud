import React from 'react'
import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContextProvider'
import AuthScreen from '../screen/AuthScreen'
import CourseEditorScreen from '../screen/CourseEditorScreen'
import HomeScreen from '../screen/HomeScreen'
import ProfileScreen from '../screen/ProfileScreen'
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext)
  console.log("isAuthenticated: ", isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/auth" />
}

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<PrivateRoute><HomeScreen /></PrivateRoute>} />
      <Route path='/profile' element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
      <Route path='/auth' element={<AuthScreen />} />
      <Route path='/course/new' element={<PrivateRoute><CourseEditorScreen /></PrivateRoute>} />
      <Route path='/course/:id' element={<PrivateRoute><CourseEditorScreen /></PrivateRoute>} />
    </Routes>
  )
}

export default Routing