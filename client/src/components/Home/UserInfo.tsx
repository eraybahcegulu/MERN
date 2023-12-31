import React from 'react';
import { Spin, Card, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

interface UserInfoProps {
    token: string;
    userName: string;
    userId: string;
    securityStamp: string;
    userInfoLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({
    token,
    userName,
    userInfoLoading,

}) => {
    const navigate = useNavigate();

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (

        <Card
            className='min-w-[300px] min-h-[150px]'
            title=
            {

                !userInfoLoading && <span> WELCOME {userName} </span>
            }
            extra=
            {
                !userInfoLoading &&
                <LogoutOutlined
                    onClick={logout}
                    className='text-2xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-300 transition-all'
                />
            }
        >
            <div className='flex flex-col items-center justify-center'>
                {
                    userInfoLoading
                        ?
                        (
                            <Spin size="large" />
                        )
                        :
                        (
                            <Radio.Group>
                                <Radio.Button onClick={() => navigate('/companies', { state: { token } })} value="large">
                                    Companies
                                </Radio.Button>
                                <Radio.Button onClick={() => navigate('/products', { state: { token } })} value="default">Products</Radio.Button>
                            </Radio.Group>
                        )
                }
            </div>
        </Card>
    );
};

export default UserInfo;
