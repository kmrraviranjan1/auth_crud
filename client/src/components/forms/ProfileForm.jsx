import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/user.service';

const ProfileForm = () => {
    const [isEditDisabled, setIsEditDisabled] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const { user,setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    React.useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setContact(user.contact)

    }, [])

    const handleProfileEdit = async () => {
        if (isEditDisabled) {
            setIsEditDisabled(false)
        } else {
            setIsEditDisabled(true)
            const data = await updateUser({name,email,contact,id:user.id})
            if(data.success){
                setUser(data.data)
                alert("User Updated Successfully")
            }
        }
    }

    const handleHomeClick = ()=>{
        navigate('/')
    }

    return (
        <Stack spacing={2} >
            <Typography variant="h6">
                Click on Edit to update the Details
            </Typography>

            <TextField id="filled-basic" label="Name" disabled={isEditDisabled} variant="outlined" value={name} onChange={(e) => { setName(e.target.value) }} />
            <TextField id="outlined-basic" label="Email" disabled variant="outlined" value={email} onChange={e => setEmail(e.target.value)} />
            <TextField id="filled-basic" label="Contact" disabled={isEditDisabled} variant="outlined" value={contact} onChange={e => setContact(e.target.value)} />
            <Button variant="contained" color="success" onClick={handleProfileEdit}> {isEditDisabled ? "Edit Profile" : "Update Details"} </Button>
            <Button variant="contained" color="warning" onClick={handleHomeClick}> Go Back to Home  </Button>
        </Stack>
    )
}

export default ProfileForm