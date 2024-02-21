import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useUserContext from '../hooks/useUserContext';

export const GithubAuthRoute = () => {
    const navigate = useNavigate();
    const { getUser, loading } = useUserContext();
    const { githubUserToken } = useParams();

    const githubAuth = async () => {
        if (githubUserToken) {
            await getUser(githubUserToken)
            navigate("/home")
        }
    }

    useEffect(() => {
        githubAuth();
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center justify-center">
            {
                loading
                &&
                <Spin size="large" />
            }
        </div>
    );
};
