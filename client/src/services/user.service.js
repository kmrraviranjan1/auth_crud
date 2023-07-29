import axios from 'axios'
import client from './network.service'
const baseURL = process.env.REACT_APP_API_BASE_URL

const registerUser = async (rawUserData) => {
    try {
        const { data } = await client.post(`/auth/signup`,
            rawUserData
        )
        return data
    } catch (error) {
        return { success: false, message: "Something Went wrong" }
    }
}

const updateUser = async (rawUserData) => {
    const { data } = await axios.patch(`${baseURL}/user/${rawUserData.id}`, rawUserData)
    return data
}

export {
    registerUser,
    updateUser
}