import { Button, Form, Input, Result, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { handleFailedServerUserError } from '../constants/errorConstant/errorUser';
import { resetPasswordService } from '../services/userService';
import useUser from '../hooks/useUser';
import { SmileOutlined } from '@ant-design/icons';

const ResetPasswordRoute = () => {
    const navigate = useNavigate();
    const { changePassword } = useUser();
    const [canResetPassword, setCanResetPassoword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [passwordIsChanged, setPasswordIsChanged] = useState<boolean>(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [resetPasswordForm] = Form.useForm();
    const { resetPasswordToken } = useParams();

    useEffect(() => {
        const handleResetPassword = async () => {
            try {
                const res = await resetPasswordService(resetPasswordToken);
                setToken(res.data.resetPasswordToken);
                setUserId(res.data.userId);
                setCanResetPassoword(true);
                setIsLoading(false);

            } catch (error: any) {
                handleFailedServerUserError(error);
                setIsLoading(false);
            }
        }
        handleResetPassword();
    }, [])

    const onFinishResetPassword = async (values: any) => {
        const passwordIsChanged = await changePassword(values, token, userId);
        if (passwordIsChanged) {
            setPasswordIsChanged(true);
            setIsLoading(false);
        }
        setCanResetPassoword(false);
        setIsLoading(false);
    };

    const goLogin = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/")
    };
    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {
                isLoading
                &&
                <Spin size="large" />
            }
            {
                (!isLoading && !passwordIsChanged) && (
                    canResetPassword ? (
                        <div className='flex justify-center items-center mt-20 drop-shadow-2xl p-24 w-[400px] h-[300px] bg-indigo-100' style={{ borderRadius: '20px' }} >
                            <Form
                                className="mt-4 flex flex-col justify-center items-center p-24 gap-4 mb-6"
                                layout="vertical"
                                onFinish={onFinishResetPassword}
                                form={resetPasswordForm}
                            >

                                <Form.Item
                                    name="newPassword"
                                    rules={[
                                        { required: true, message: "New Password required" },
                                        { max: 40, message: "Max. 40 characters." }
                                    ]}

                                >
                                    <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='New Password' />
                                </Form.Item>

                                <Form.Item
                                    name="newPasswordConfirm"
                                    dependencies={['newPassword']}
                                    rules={[
                                        { required: true, message: "Confirm New Password required" },
                                        { max: 40, message: "Max. 40 characters." },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='Confirm New Password' />
                                </Form.Item>
                                <Form.Item className="flex justify-center mb-0">
                                    <Button
                                        className='hover:scale-105 transition duration-700'
                                        style={{ borderRadius: "0" }}
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                    >
                                        <strong>CHANGE PASSWORD</strong>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
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
                )
            }
            {
                passwordIsChanged
                &&
                <Result
                    icon={<SmileOutlined />}
                    title="Your password is changed. Login Now."
                    extra={
                        <Button type="primary" onClick={goLogin}>
                            Go Login
                        </Button>
                    }
                />
            }
        </div>
    )
}

export default ResetPasswordRoute