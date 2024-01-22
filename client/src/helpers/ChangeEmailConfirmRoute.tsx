import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { Button, Result, Spin } from 'antd';
import { handleFailedServerUserError } from '../constants/errorConstant/errorUser';
import { successChangeEmailConfirm } from '../constants/notifyConstant/notifyUser';
import { changeEmailConfirm } from '../services/userService';

export const ChangeEmailConfirmRoute = () => {
    const navigate = useNavigate();

    const { changeEmailConfirmToken } = useParams();

    const [isChangedMail, setIsChangedMail] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    useEffect(() => {
        const handleChangeEmailConfirm = async () => {
            try {
                const res = await changeEmailConfirm(changeEmailConfirmToken);
                setIsChangedMail(true);
                setIsLoading(false);

                successChangeEmailConfirm(res.data.message)
            } catch (error: any) {
                handleFailedServerUserError(error);
                setIsLoading(false);
            }
        }
        handleChangeEmailConfirm();
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
                    isChangedMail ? (
                        <Result
                            icon={<SmileOutlined />}
                            title="Your email address successfully changed. Login Now."
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
