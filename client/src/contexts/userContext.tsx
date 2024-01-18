import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { userInfo } from '../services/userService';

import { handleFailedServerUserError } from '../constants/errorConstant/errorUser';

import useCompanySlice from '../hooks/useCompanySlice';
import useProductSlice from '../hooks/useProductSlice';

interface UserProviderProps {
    children: ReactNode;
}

interface User { }

interface UserContextType {
    user: User[];
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    getUser: (token: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | any>(null);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { fetchCompany } = useCompanySlice();
    const { fetchProduct } = useProductSlice();

    const fetchUserData = async (token: string) => {
        try {
            const response = await userInfo(token);
            token = response.data.token;
            setUser(response.data);
            fetchProduct(token)
            fetchCompany(token)
            setLoading(false);
        } catch (error: any) {
            handleFailedServerUserError(error);
        }
    };

    const rememberMe = () => {
        const rememberMeToken = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (rememberMeToken) {
            fetchUserData(rememberMeToken);
        }
    };

    useEffect(() => {
        rememberMe();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                setLoading,
                getUser: (token: any) => fetchUserData(token),
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export {
    UserProvider
}

export default UserContext;