import React, { useContext } from 'react'
import { useState } from 'react'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { AuthContext } from '../context/AuthContextProvider';
import { Navigate } from 'react-router-dom';

const AuthScreen = () => {
    const { isAuthenticated } = useContext(AuthContext)
    const [activeForm, setActiveForm] = useState('login')
    if(isAuthenticated){
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <Box width={400} margin='auto'>
                <Stack spacing={2} direction="row" justifyContent="space-evenly"
                    alignItems="center">
                    <Button fullWidth variant={activeForm === 'login' && "contained"} onClick={() => setActiveForm('login')}>Login</Button>
                    <Button fullWidth variant={activeForm === 'register' && "contained"} onClick={() => setActiveForm('register')}>Register</Button>
                </Stack>

                <Box pt={2}>
                    {activeForm === 'login' && <Login />}
                    {activeForm === 'register' && <Register />}
                </Box>
            </Box>
        </>
    )
}

export default AuthScreen