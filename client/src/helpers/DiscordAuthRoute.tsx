import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const DiscordAuthRoute = () => {
    const navigate = useNavigate();

    const { discordUserToken } = useParams();

    useEffect(() => {

        if (discordUserToken) {
            sessionStorage.setItem('token', discordUserToken);
            navigate("/home")
        }
    }, []);


    return (
        <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center justify-center">
            <Spin size="large" />
        </div>
    );
};
