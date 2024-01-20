import React, { useEffect } from 'react';
import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';

import useUserContext from "../hooks/useUserContext";
import { firstLoginNotify } from '../constants/notifyConstant/notifyUser';

const Home: React.FC = () => {

    const { isFirstLogin, user, setIsFirstLogin } = useUserContext();

    useEffect(() => {
        if(isFirstLogin)
        {
            firstLoginNotify(user.userName);
            setIsFirstLogin(false);
        }
    }, []);

    return (
        <>

            <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
                <div className='flex flex-col items-center gap-4'>
                    <UserInfo />
                    <Panels />
                </div>
            </div>


        </>
    );
};

export default Home;
