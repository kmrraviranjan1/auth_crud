import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { loginUser } from '../../services/auth.service';
import { AuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import useToken from '../../hooks/useToken';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const {  setUser, setAccessToken } = useContext(AuthContext)
  const { setToken } = useToken()

  const handleLogin = async () => {
    if (!email || !password) {
      return alert('Please Fill all details properly')
    }

    const { success, data } = await loginUser({ email, password })
    if (success) {
      setAccessToken(data?.accessToken)
      setToken(data?.accessToken)
      const { username, name } = jwt_decode(data?.accessToken)
      setUser({ email: username, name })
      // signInUser()
      navigate('/')
    }
    else {
      alert('Login Failed, Please use correct credentials or register user first')
    }
  }

  return (
    <Stack spacing={2} >
      <Typography variant="h6">
        Enter Your credentials to start the journey
      </Typography>

      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField id="filled-basic" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />

      <Button variant="contained" color="success" onClick={handleLogin}> Submit </Button>
    </Stack>
  )
}

export default Login