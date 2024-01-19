import React, { useState } from 'react';
import { Card, Radio, Modal, Form, Button, Input, Spin, Carousel, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowDownOutlined, InfoCircleOutlined, LogoutOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';

import { changeEmail, changePassword } from '../../services/userService';
import { errorChangePassword, successChangePassword, successChangeEmail, errorChangeEmail } from '../../constants/notifyConstant/notifyUser';

import { handleChangeEmailError, handleChangePasswordError } from '../../constants/errorConstant/errorUser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';

import useUserContext from '../../hooks/useUserContext';
import useLogout from '../../hooks/useLogout';

const contentStyle: React.CSSProperties = {
    height: '375px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

const UserInfo: React.FC = () => {
    const { user, loading, getUser } = useUserContext();
    const [changePasswordForm] = Form.useForm();
    const [changeEmailForm] = Form.useForm();

    const { logout } = useLogout();

    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinishChangePassword = async (values: any) => {
        try {
            if (values.currentPassword === values.newPassword) {
                return errorChangePassword(
                    <span>Current password and new password cannot be the same</span>
                );
            }
            const res = await changePassword(user.userId, values, user.token);
            successChangePassword(res.data.message);
            setIsAccountSettingsModalOpen(false);
            setTimeout(() => {
                changePasswordForm.resetFields();
            }, 100);


        } catch (error: any) {
            handleChangePasswordError(error);
        }
    };

    const onFinishChangeEmail = async (values: any) => {
        try {
            if (values.newEmail === user.email) {
                return errorChangeEmail(
                    <span>New email and current email cannot be the same</span>
                );
            }
            const res = await changeEmail(user.userId, values, user.token);
            successChangeEmail(res.data.message);
            getUser(res.data.token);
            setIsAccountSettingsModalOpen(false);
            setTimeout(() => {
                changeEmailForm.resetFields();
            }, 100);


        } catch (error: any) {
            handleChangeEmailError(error);
        }
    };

    const handleLogout = (): void => {
        logout();
    };

    return (
        <>
            <Card
                className='min-w-[300px] min-h-[150px]'
                title=
                {
                    <div className='flex flex-col items-center p-2 gap-2'>
                        {
                            !loading
                                ?
                                <>
                                    <div className='flex flex-col items-center'>
                                        <span> WELCOME {user.userName} </span>
                                        <span> {user.email} </span>
                                    </div>


                                    <div>
                                        <SettingOutlined onClick={() => setIsAccountSettingsModalOpen(true)} className='ml-2 hover:scale-125 cursor-pointer text-2xl hover:opacity-50 transition-all' />
                                        <LogoutOutlined
                                            onClick={handleLogout}
                                            className='ml-2 text-2xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-300 transition-all'
                                        />
                                    </div>

                                </>
                                :
                                <Spin size="large" />
                        }
                    </div>
                }
            >
                <div className='flex flex-col items-center justify-center'>
                    {

                        <Radio.Group>
                            <Radio.Button className='hover:scale-105 transition duration-700' onClick={() => navigate('/companies')} value="large">
                                Companies
                            </Radio.Button>
                            <Radio.Button className='hover:scale-105 transition duration-700' onClick={() => navigate('/products')} value="default">Products</Radio.Button>
                        </Radio.Group>

                    }
                </div>
            </Card>

            <Modal
                className='text-center'
                open={isAccountSettingsModalOpen}
                onCancel={() => setIsAccountSettingsModalOpen(false)}
                footer={false}
            >
                <h2>
                    <strong>ACCOUNT SETTINGS</strong>
                </h2>

                <Carousel>
                    <div>
                        <div style={contentStyle} className='flex flex-col items-center justify-center gap-2'>
                            <Form
                                className="mt-4 flex flex-col gap-4 mb-6"
                                layout="vertical"
                                onFinish={onFinishChangePassword}
                                form={changePasswordForm}
                            >
                                <Form.Item
                                    className='mb-0'
                                    name="currentPassword"
                                    rules={[
                                        { required: true, message: "Current Password required" },
                                        { max: 40, message: "Max. 40 characters." }
                                    ]}
                                >
                                    <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='Current Password' />
                                </Form.Item>

                                <ArrowDownOutlined className='text-white text-2xl mt-0 justify-center' />

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
                    </div>

                    <div>
                        <div style={contentStyle} className='flex flex-col items-center justify-center gap-2'>
                            <strong className='text-xl'>{user.email}</strong>
                            <ArrowDownOutlined className='text-2xl mt-0' />

                            <Form
                                className="mt-4 flex flex-col gap-4 mb-6"
                                layout="vertical"
                                onFinish={onFinishChangeEmail}
                                form={changeEmailForm}
                            >
                                <Form.Item
                                    name="newEmail"
                                    rules={[{ type: 'email', required: true, message: 'New Email required' },
                                    { max: 40, message: "Max. 40 characters." }
                                    ]}
                                >
                                    <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='New Email' />
                                </Form.Item>

                                <Form.Item
                                    name="newEmailConfirm"
                                    dependencies={['newEmail']}
                                    rules={[
                                        { type: 'email', required: true, message: 'Confirm New Email required' },
                                        { max: 40, message: "Max. 40 characters." },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newEmail') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new email that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='Confirm New Email' />
                                </Form.Item>
                                <Form.Item className="flex justify-center mb-0">
                                    <Button
                                        className='hover:scale-105 transition duration-700'
                                        style={{ borderRadius: "0" }}
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                    >
                                        <strong> CHANGE EMAIL </strong>
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>

                    <div>
                        <div style={contentStyle} className='flex flex-col items-center justify-center gap-2'>
                            {
                                !(user.userRole === 'admin' || user.userRole === 'premium')
                                ?
                                <>
                                    <span> YOU HAVE STANDARD MEMBERSHIP </span>
                                    <span className='text-2xl'> GET PREMIUM NOW </span>
                                    <FontAwesomeIcon className='hover:cursor-pointer text-4xl text-violet-500 hover:text-violet-400 ' icon={faGem} shake />
                                    <Popover placement="bottom"
                                            content={
                                                <div className='flex flex-col gap-2 text-xs'>
                                                    <span className='text-xs'> <PlusOutlined /> <strong>Premium Search</strong> </span>
                                                </div>
                                            }
                                        >

                                            <InfoCircleOutlined className='text-md mt-4 hover:scale-125 transition-all' />
                                        </Popover>

                                </>
                                :
                                <>
                                    <span className='text-2xl'> PREMIUM ACTIVATED </span>
                                </>
                            }
                        </div>
                    </div>

                </Carousel>

            </Modal>


        </>
    );
};

export default UserInfo;
