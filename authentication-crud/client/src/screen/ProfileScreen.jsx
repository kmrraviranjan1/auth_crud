import React, { useContext } from 'react'
import AppLayout from '../components/AppLayout'
import ProfileForm from '../components/forms/ProfileForm'


const ProfileScreen = () => {
   

    return (
        <AppLayout title="User Profile" >
            <ProfileForm />
        </AppLayout>
    )
}

export default ProfileScreen