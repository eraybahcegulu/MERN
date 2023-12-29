import React, { useEffect, useState } from 'react';
import { Button, message, Result } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';

interface UserInfo {
    username: string;
    id: string;
    securitystamp: string;
}

const Home: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token?.toString() || localStorage.getItem('token');
    const [failedAuth, setFailedAuth] = useState<boolean>(false);
    const [userInfoLoading, setUserInfoLoading] = useState<boolean>(true);

    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [securityStamp, setsecurityStamp] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async (): Promise<void> => {
        try {
            const userToken = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res: AxiosResponse<UserInfo> = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/userInfo`,
                userToken
            );

            if (res.data.securitystamp !== (localStorage.getItem('securityStamp') || sessionStorage.getItem('securityStamp'))) {
                localStorage.clear();
                sessionStorage.clear();
                return setFailedAuth(true);
            }

            setUserName(res.data.username);
            setUserId(res.data.id);
            setsecurityStamp(res.data.securitystamp);
            setUserInfoLoading(false);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                sessionStorage.clear();
                localStorage.clear();
                return setFailedAuth(true);
            } else {
                message.error(
                    <span>
                        <strong> Server Error. </strong>
                    </span>
                );
            }

            console.error(error);
        }
    };

    const handle404 = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="bg-slate-500 h-screen w-screen flex flex-col items-center pt-20">
            {failedAuth === true || !(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
                <>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Failed."
                        extra={<Button onClick={handle404} type="primary">Go Login</Button>}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center gap-4'>
                    <UserInfo
                        token={token}
                        userName={userName}
                        userId={userId}
                        securityStamp={securityStamp}
                        userInfoLoading={userInfoLoading}
                    />

                    <Panels />
                </div>

            )}
        </div>
    );
};

export default Home;
