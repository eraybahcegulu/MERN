import React from 'react';
import { Button, Spin, Card, Divider, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

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
    userId,
    securityStamp,
    userInfoLoading,

}) => {
    const navigate = useNavigate();

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <>
            {userInfoLoading ? (
                <Spin size="large" />
            ) : (
                <Card
                    title={<span> WELCOME {userName} </span>}
                    extra={
                        <Button className='ml-4' onClick={logout} type="primary" danger>
                            Logout
                        </Button>
                    }
                >
                    <div className='flex flex-col items-center '>
                        <div>
                            <p>{userId}</p>
                            <p>{securityStamp}</p>
                        </div>

                        <Divider />

                        <div>
                            <Radio.Group>
                                <Radio.Button onClick={() => navigate('/companies', { state: { token } })} value="large">
                                    Companies
                                </Radio.Button>
                                <Radio.Button onClick={() => navigate('/products', { state: { token } })} value="default">Products</Radio.Button>
                            </Radio.Group>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
};

export default UserInfo;
