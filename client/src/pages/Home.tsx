import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';

import { fetchCompanyData } from '../redux-toolkit/companySlice';
import { fetchProductData } from '../redux-toolkit/productSlice';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';



import { useUserData } from "../contexts/userContext";


const Home: React.FC = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const { user } = useUserData();

    useEffect(() => {
        dispatch(fetchCompanyData(token));
        dispatch(fetchProductData(token));
    },[]);



    const handle404 = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {!(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
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
                        user={user}
                    />

                    <Panels />
                </div>

            )}
        </div>
    );
};

export default Home;
