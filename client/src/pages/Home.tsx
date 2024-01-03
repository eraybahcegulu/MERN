import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';




import { useUserData } from "../contexts/userContext";


const Home: React.FC = () => {

    const navigate = useNavigate();



    const { user } = useUserData();

    useEffect(() => {

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
