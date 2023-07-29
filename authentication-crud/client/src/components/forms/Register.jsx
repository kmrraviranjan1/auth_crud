import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { registerUser } from '../../services/user.service';
import { redirect } from "react-router-dom";
import { AuthContext } from '../../context/AuthContextProvider';
const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState()
  const [contact, setContact] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { signInUser, setUser } = useContext(AuthContext)

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return alert('Password and confirm Password does not match')
    }
    const { data, success, message } = await registerUser({ name, contact, email, password })
    if (success) {
      setUser(data.data)
      signInUser()
      redirect('/')
    }
    else {
      alert(message)
    }
  }

  return (
    <Stack spacing={2} >
      <Typography variant="h6">
        Fill up the basic details to start the journey
      </Typography>

      <TextField id="filled-basic" label="Name" variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
      <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
      <TextField id="filled-basic" label="Contact" variant="outlined" value={contact} onChange={e => setContact(e.target.value)} />
      <TextField id="filled-basic" label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} />
      <TextField id="filled-basic" label="Confirm Password" variant="outlined" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />

      <Button variant="contained" color="success" onClick={handleRegister}> Submit </Button>
    </Stack>
  )
}

export default Register