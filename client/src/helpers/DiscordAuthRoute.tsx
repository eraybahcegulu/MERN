import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

export const DiscordAuthRoute = () => {
    const navigate = useNavigate();
    const { getUser } = useUserContext();
    const { discordUserToken } = useParams();

    const discordAuth = async () => {
        if (discordUserToken) {
            await getUser(discordUserToken)
            navigate("/home")
        }
    }
    useEffect(() => {
        discordAuth()
    }, []);


    return (
        <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center justify-center">
            <Spin size="large" />
        </div>
    );
};
