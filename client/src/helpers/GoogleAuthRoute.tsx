import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

export const GoogleAuthRoute = () => {
    const navigate = useNavigate();
    const { getUser, } = useUserContext();
    const { googleUserToken } = useParams();

    const googleAuth = async () => {
        if (googleUserToken) {
            await getUser(googleUserToken)
            navigate("/home")
        }
    }

    useEffect(() => {
        googleAuth();
    }, []);


    return (
        <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center justify-center">
            <Spin size="large" />
        </div>
    );
};
