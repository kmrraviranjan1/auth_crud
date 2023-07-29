import { useState } from "react";

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('accessToken')
        const userToken = JSON.parse(tokenString)
        console.log("userToken: ", userToken);
        return userToken
    }
    const saveToken = (userToken) => {
        sessionStorage.setItem('accessToken', JSON.stringify(userToken))
        setToken(userToken)
    }
    const [token, setToken] = useState(getToken)
    
    return {
        token,
        setToken: saveToken
    }
}