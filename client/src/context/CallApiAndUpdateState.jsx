import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { authHeaders, GET_USER_API, URL } from '../constant';

// Create the context
const CallApi = createContext();

// Create the context provider component
const CallApiContext = ({ children }) => {
    const [user, setUser] = useState({})

    const getUser = async () => {
        try {
            const response = await axios.get(`${URL}${GET_USER_API}`, authHeaders)
            console.log('CallApiContext fetch user', response?.data)
            localStorage.setItem('token', response?.data?.token)
            localStorage.setItem('role', response?.data?.user?.user_role)
            localStorage.setItem('userId', response?.data?.user?._id)
            setUser(response?.data)
            return user
        } catch (error) {
            console.log('error:', error)
            return error
        }
    }


    const value = {
        getUser,
        user
    };

    return (
        <CallApi.Provider value={value}>
            {children}
        </CallApi.Provider>
    );
};

// Custom hook to use the CallApi context
export const useCallApi = () => useContext(CallApi);

export default CallApiContext;
