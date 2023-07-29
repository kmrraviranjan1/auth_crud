import axios from 'axios'
const baseURL = process.env.REACT_APP_API_BASE_URL

const loginUser = async (rawUserData)=>{
    const {data} = await axios.post(`${baseURL}/auth/signin`,
        rawUserData
    )
    return data
}

export {
    loginUser
}