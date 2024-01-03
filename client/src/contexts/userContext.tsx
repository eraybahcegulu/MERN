import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { userInfo } from '../services/userService';
import { fetchCompanyData } from '../redux-toolkit/companySlice';
import { fetchProductData } from '../redux-toolkit/productSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';


interface UserProviderProps {
    children: ReactNode;
}

interface User {

}

interface UserContextType {
    user: User[];
    getUser: (token: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | any>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const fetchUserData = async (token: string ) => {
        try {
            const response = await userInfo(token);
            token = response.data.token;
            console.log(response.data)
            setUser(response.data);
            dispatch(fetchCompanyData(token));
            dispatch(fetchProductData(token));
        } catch (error: any) {
            console.error("Error User Data:", error);
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error", error.response.data);
            }
        }
    };

    const rememberMe = () => {
        const rememberMeToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (rememberMeToken) {
            fetchUserData(rememberMeToken);
            dispatch(fetchCompanyData(rememberMeToken));
            dispatch(fetchProductData(rememberMeToken));
        }
    };

    useEffect(() => {
        rememberMe();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                getUser: (token: any) => fetchUserData(token),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(UserContext);
};
