import React, { useEffect } from 'react';
import useUser from '../hooks/useUser';
import NotAuth from '../pages/NotAuth';
import { Spin } from 'antd';

export const PrivateRoute = ({ children }: any) => {
    const { user, loading, setLoading } = useUser();

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
