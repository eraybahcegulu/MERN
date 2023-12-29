import React, { useEffect, useState } from 'react';
import { Button, Input, message, Result } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';

const Product: React.FC = () => {
    const location = useLocation();
    const token = location.state?.token?.toString() || localStorage.getItem('token');
    const [failedAuth, setFailedAuth] = useState<boolean>(false);

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

            const res: AxiosResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/userInfo`,
                userToken
            );

            if (res.data.securitystamp !== (localStorage.getItem('securityStamp') || sessionStorage.getItem('securityStamp'))) {
                localStorage.clear();
                sessionStorage.clear();
                return setFailedAuth(true);
            }


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

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
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
                        status="404"
                        title="404"
                        subTitle="Failed."
                        extra={<Button onClick={handle404} type="primary">Go Login</Button>}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center gap-4'>

                    <span> <strong> PRODUCTS </strong></span>

                    <div className="flex flex-row item-center justify-center mt-10 gap-4">

                        <ArrowLeftOutlined onClick={() => navigate('/home', { state: { token } })} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl mr-4" />

                        <Input size="large" prefix={<SearchOutlined />} />

                        <UserAddOutlined className="hover:cursor-pointer text-green-700 hover:text-green-600 transition-all text-2xl" />

                        <EditOutlined className="hover:cursor-pointer text-blue-600 hover:text-blue-500 transition-all text-2xl" />

                        <DeleteOutlined className="hover:cursor-pointer text-red-600 hover:text-red-500 transition-all text-2xl" />

                        <LogoutOutlined onClick={logout} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl" />
                    </div>


                </div>

            )}
        </div>
    );
};

export default Product;
