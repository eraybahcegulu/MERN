import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { GET_USER_INFO_API_URL } from '../constants/apiconstant';

interface UserProviderProps {
    children: ReactNode;
}

interface User {
    userName: string;
}

interface UserContextType {
    user: User[];
    getUser: () => Promise<void>;
}
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
const UserContext = createContext<UserContextType | any>(null);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User[]>([]);

    const fetchUserData = async (url: any, token: any, setData: any) => {
        try {
            const response = await axios.post(url,

                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                }

            );
            setData(response.data);
        } catch (error: any) {
            console.error("Error User Data:", error);
            if (axios.isAxiosError(error) && error.response) {
                console.error("Error", error.response.data);
            }
        }
    };

    useEffect(() => {
        fetchUserData(GET_USER_INFO_API_URL, token, setUser);
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                getUser: () => fetchUserData(GET_USER_INFO_API_URL, token, setUser),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => {
    return useContext(UserContext);
};
