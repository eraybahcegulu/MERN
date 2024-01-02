import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';

import { fetchCompanyData } from '../redux-toolkit/companySlice';
import { fetchProductData } from '../redux-toolkit/productSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

import { userInfo } from '../services/userService';
import { failedServer, failedGetUserInfo } from '../constants/notifyConstant';

//import { useUserData } from "../contexts/userContext"; //if userContext use

const Home: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token?.toString() || localStorage.getItem('token') || sessionStorage.getItem('token');
    const [failedAuth, setFailedAuth] = useState<boolean>(false);
    const [userInfoLoading, setUserInfoLoading] = useState<boolean>(true);

    const [email, setEmail] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [securityStamp, setsecurityStamp] = useState<string>('');

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();


    //const { user, getUser } = useUserData();  //if userContext use

    

    useEffect(() => {
        /* if userContext use
        getUser();
        console.log(user);
        */ 
        getUserInfo();
        dispatch(fetchCompanyData());
        dispatch(fetchProductData());
 //
    },[dispatch]);

    const getUserInfo = async (): Promise<void> => {
        try {

            const res = await userInfo(token);

            if (res.data.securitystamp !== (localStorage.getItem('securityStamp') || sessionStorage.getItem('securityStamp'))) {
                localStorage.clear();
                sessionStorage.clear();
                return setFailedAuth(true);
            }

            setEmail(res.data.email);
            setUserName(res.data.userName);
            setUserId(res.data.id);
            setsecurityStamp(res.data.securitystamp);
            setUserInfoLoading(false);
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                console.log(error)
                failedGetUserInfo(error.response.data.message)
                sessionStorage.clear();
                localStorage.clear();
                return setFailedAuth(true);
            } else {
                failedServer(error.message)
            }
        }
    };

    const handle404 = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {failedAuth === true || !(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
                <>
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button onClick={handle404} type="primary">Go Login</Button>}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center gap-4'>
                    <UserInfo
                        token={token}
                        email={email}
                        userName={userName}
                        userId={userId}
                        securityStamp={securityStamp}
                        userInfoLoading={userInfoLoading}
                        //user={user} //if userContext use
                    />

                    <Panels />
                </div>

            )}
        </div>
    );
};

export default Home;
