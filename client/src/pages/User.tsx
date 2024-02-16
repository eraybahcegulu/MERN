import { ArrowLeftOutlined, LogoutOutlined } from '@ant-design/icons';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import UserList from '../components/User/UserList';

const User: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useUser();
    const handleLogout = (): void => {
        logout();
    };
    return (
        <div>
            <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
                <div className='flex flex-col items-center gap-4'>
                    <span><strong className='text-2xl'>USERS</strong></span>

                    <div className="flex flex-row item-center justify-center mt-10 gap-4">
                        <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer hover:opacity-50 hover:scale-125 transition-all text-2xl mr-4" />
                        <LogoutOutlined onClick={handleLogout} className="hover:cursor-pointer  hover:opacity-50 hover:scale-125 transition-all text-2xl" />
                    </div>

                    <div>
                        <UserList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User