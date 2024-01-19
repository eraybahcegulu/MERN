import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { emailConfirm } from "../services/userService";
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result, Spin } from 'antd';
import { handleFailedServerUserError } from '../constants/errorConstant/errorUser';
import { successEmailConfirm } from '../constants/notifyConstant/notifyUser';

export const EmailConfirmRoute = () => {
    const navigate = useNavigate();

    const params = useParams();
    const { emailConfirmToken } = params;

    const [isConfirmedMail, setIsConfirmedMail] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const handleEmailConfirm = async () => {
            try {
                const res = await emailConfirm(emailConfirmToken);
                setIsConfirmedMail(true);
                setIsLoading(false);
                successEmailConfirm(res.data.message)
            } catch (error: any) {
                handleFailedServerUserError(error);
            }
        }
        handleEmailConfirm();
    }, [])

    const goLogin = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/")
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {
                !isLoading ? (
                    isConfirmedMail ? (
                        <Result
                            icon={<SmileOutlined />}
                            title="Your email successfully confirmed. Login Now."
                            extra={
                                <Button type="primary" onClick={goLogin}>
                                    Go Login
                                </Button>
                            }
                        />
                    ) : (
                        <Result
                            status="404"
                            title="404"
                            subTitle="Sorry, the page you visited does not exist."
                            extra={
                                <Button type="primary" onClick={goLogin}>
                                    Go Login
                                </Button>
                            }
                        />
                    )
                ) : (
                    <Spin size="large" />
                )
            }
        </div>

    );
};
