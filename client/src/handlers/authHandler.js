import axios from "axios"
import { authHeaders, GET_USER_API, URL } from "../constant"

export const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('selectedPlan')
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${URL}${GET_USER_API}`, authHeaders)
        console.log('CallApiContext fetch user', response?.data)
        localStorage.setItem('token', response?.data?.token)
        localStorage.setItem('role', response?.data?.user?.user_role)
        localStorage.setItem('userId', response?.data?.user?._id)
        const user = response.data.user
        console.log(user)
        return user
    } catch (error) {
        console.log('error:', error)
        return error
    }
}