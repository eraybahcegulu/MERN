import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GoogleAuthRoute = () => {
    const navigate = useNavigate();

    const { googleUserToken } = useParams();

    useEffect(() => {

        if (googleUserToken) {
            sessionStorage.setItem('token', googleUserToken);
            navigate("/home")
        }
    }, []);


    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center justify-center">
            <Spin size="large" />
        </div>
    );
};
