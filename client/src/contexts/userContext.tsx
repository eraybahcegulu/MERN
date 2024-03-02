import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { userInfoService } from '../services/userService';

import { handleFailedServerUserError } from '../constants/errorConstant/errorUser';

import useSlice from '../hooks/useSlice';
import userRoles from '../constants/enums';

interface UserProviderProps {
    children: ReactNode;
}

interface User {

}

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
    const [isFirstLogin, setIsFirstLogin] = useState<boolean>(false);

    const { fetchCompanies, fetchProducts, fetchUsers } = useSlice();

    //console.log(user)
    const fetchUserData = async (token: string) => {
        try {
            const response = await userInfoService(token);
            token = response.data.token;
            console.log(response.data)
            setUser(response.data);

            if(response.data.isGithubAuth || response.data.isGoogleAuth || response.data.isDiscordAuth || response.data.isTwitterAuth)
            {
                sessionStorage.setItem('token', token);
            }

            if (localStorage.getItem('token')) {
                localStorage.setItem('token', token);
            }

            if (sessionStorage.getItem('token')) {
                sessionStorage.setItem('token', token);
            }

            fetchProducts(token);
            fetchCompanies(token);

            if (response.data.userRole === userRoles.ADMIN) {
                fetchUsers(token);
            }

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
                isFirstLogin,
                setIsFirstLogin,
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