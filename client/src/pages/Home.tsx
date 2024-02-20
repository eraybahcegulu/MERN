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

            <div className="bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex flex-col items-center">
                <div className='flex flex-col items-center gap-4'>
                    <UserInfo />
                    <Panels />
                </div>
            </div>


        </>
    );
};

export default Home;
