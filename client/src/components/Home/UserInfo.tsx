import React, { useState } from 'react';
import { Spin, Card, Radio, Modal, Form, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowDownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

import { changePassword } from '../../services/userService';
import { successChangePassword, errorChangePassword, failedServer } from '../../constants/notifyConstant'

interface UserInfoProps {
    token: string;
    userName: string;
    userId: string;
    securityStamp: string;
    userInfoLoading: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({
    token,
    userId,
    userName,
    userInfoLoading,

}) => {

    const [changePasswordForm] = Form.useForm();

    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinishChangePassword = async (values: any) => {
        try {
            if (values.currentPassword === values.newPassword) {
                return errorChangePassword(
                    <span>Current password and new password cannot be the same</span>
                );
            }
            const res = await changePassword(userId, values, token);
            successChangePassword(res.data.message);
            setIsChangePasswordModalOpen(false);
            setTimeout(() => {
                changePasswordForm.resetFields();
            }, 100);


        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                errorChangePassword(error.response.data.message)
            }
            else {
                failedServer(error.message)
            }
        }
    };

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <>
            <Card
                className='min-w-[300px] min-h-[150px]'
                title=
                {

                    !userInfoLoading && <span> WELCOME {userName}</span>
                }
                extra=
                {
                    !userInfoLoading &&
                    <>
                        <SettingOutlined onClick={() => setIsChangePasswordModalOpen(true)} className='ml-2 hover:scale-125 cursor-pointer text-2xl hover:opacity-50 transition-all' />
                        <LogoutOutlined
                            onClick={logout}
                            className='ml-2 text-2xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-300 transition-all'
                        />
                    </>
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

            <Modal
                className='text-center'
                open={isChangePasswordModalOpen}
                onCancel={() => setIsChangePasswordModalOpen(false)}
                footer={false}
            >
                <h2>
                    <strong>CHANGE PASSWORD</strong>
                </h2>
                <Form
                    className="mt-4 flex flex-col gap-4"
                    layout="vertical"
                    onFinish={onFinishChangePassword}
                    form={changePasswordForm}
                >
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <Form.Item
                            className='mb-0'
                            name="currentPassword"
                            rules={[
                                { required: true, message: "Current Password required" },
                                { max: 20, message: "Max. 20 characters." }
                            ]}
                        >
                            <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='Current Password' />
                        </Form.Item>

                        <ArrowDownOutlined className='text-2xl mt-0' />

                        <Form.Item
                            name="newPassword"
                            rules={[
                                { required: true, message: "Current Password required" },
                                { max: 20, message: "Max. 20 characters." }
                            ]}

                        >
                            <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='New Password' />
                        </Form.Item>

                        <Form.Item
                            name="newPasswordConfirm"
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: "Current Password Confirm required" },
                                { max: 20, message: "Max. 20 characters." },
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
                        <Form.Item className="flex justify-end mb-0">
                            <Button
                                style={{ borderRadius: "0" }}
                                type="primary"
                                htmlType="submit"
                                size="large"
                            >
                                <strong> CHANGE </strong>
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default UserInfo;
