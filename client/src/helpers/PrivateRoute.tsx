import React, { useEffect } from 'react';
import { useUserData } from '../contexts/userContext';
import NotAuth from '../pages/NotAuth';
import { Spin } from 'antd';

export const PrivateRoute = ({ children }: any) => {
    const { user, loading, setLoading } = useUserData();

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
                <div className="bg-slate-400 h-screen w-screen flex flex-col items-center justify-center">
                    <Spin size="large" />
                </div>
            )
    );
};
