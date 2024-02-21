import React, { useEffect } from 'react';
import useUserContext from '../hooks/useUserContext';
import NotAuth from '../pages/NotAuth';
import { Spin } from 'antd';

export const PrivateRoute = ({ children }: any) => {
    const { user, loading, setLoading } = useUserContext();

    useEffect(() => {
        if (!(localStorage.getItem('token') || sessionStorage.getItem('token'))) {
            setLoading(false);
        }
    }, []);

    return (
        !loading
            ?
            (user ? children : <NotAuth />)
            :
            (
                <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center justify-center">
                    <Spin size="large" />
                </div>
            )
    );
};
