import React from 'react';

import UserInfo from '../components/Home/UserInfo';
import Panels from '../components/Home/Panels';

const Home: React.FC = () => {

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            <div className='flex flex-col items-center gap-4'>
                <UserInfo/>
                <Panels />
            </div>
        </div>
    );
};

export default Home;
