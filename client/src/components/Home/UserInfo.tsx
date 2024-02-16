import React, { useRef, useState } from 'react';
import { Card, Radio, Modal, Form, Button, Input, Spin, Carousel, Popover, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowDownOutlined, InfoCircleOutlined, LockOutlined, LogoutOutlined, PlusOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';

import useUserContext from '../../hooks/useUserContext';
import useUser from '../../hooks/useUser';
import userRoles from '../../constants/enums';

const contentStyle: React.CSSProperties = {
    height: '375px',
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

const UserInfo: React.FC = () => {
    const { user, loading } = useUserContext();
    const [changePasswordForm] = Form.useForm();
    const [changeEmailForm] = Form.useForm();
    const [registerVisitorForm] = Form.useForm();
    const [changeAvatarForm] = Form.useForm();

    const { logout, changePassword, changeEmail, registerVisitor, getPremium, changeAvatar } = useUser();
    const navigate = useNavigate();

    const [isAccountSettingsModalOpen, setIsAccountSettingsModalOpen] = useState<boolean>(false);
    const [newAvatarName, setNewAvatarName] = useState<String | null>(null);
    const timeoutRef = useRef<number | null>(null);
    const [avatarLoading, setAvatarLoading] = useState<boolean>();

    const onFinishChangePassword = async (values: any) => {
        changePassword(values);
        setIsAccountSettingsModalOpen(false);
        setTimeout(() => {
            changePasswordForm.resetFields();
        }, 100);
    };

    const onFinishChangeEmail = async (values: any) => {
        changeEmail(values)
        setIsAccountSettingsModalOpen(false);
        setTimeout(() => {
            changeEmailForm.resetFields();
        }, 100);
    };

    const onFinishRegisterVisitor = async (values: any) => {
        registerVisitor(values)
        setIsAccountSettingsModalOpen(false);
        setTimeout(() => {
            registerVisitorForm.resetFields();
        }, 100);
    };

    const handleGetPremium = async () => {
        getPremium()
    };

    const handleChangeAvatar = (e: any) => {
        setAvatarLoading(true);
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            console.log("test")
            const avatarName = `https://api.multiavatar.com/${e.target.value}.png`;
            setNewAvatarName(avatarName);
            timeoutRef.current = null;
            setAvatarLoading(false)
        }, 3000) as any;
    };

    const onFinishChangeAvatar = async (values: any) => {
        changeAvatar(values);
        changeAvatarForm.resetFields();
        setNewAvatarName(null);
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

                                        <Avatar
                                            size={100}
                                            src={user.avatar}

                                            className='mb-2' />
                                        <span> WELCOME {user.userName} {user.userRole === userRoles.VISITOR && <span> VISITOR </span>}</span>
                                        <span> {user.email} </span>
                                    </div>


                                    <div className='flex flex-row gap-3'>
                                        {
                                            user.userRole === userRoles.ADMIN
                                            &&

                                            <TeamOutlined onClick={() => navigate('/users')} className='hover:scale-125 cursor-pointer text-2xl hover:opacity-50 transition-all text-blue-600' />
                                        }
                                        <SettingOutlined onClick={() => setIsAccountSettingsModalOpen(true)} className='hover:scale-125 cursor-pointer text-2xl hover:opacity-50 transition-all' />
                                        <LogoutOutlined
                                            onClick={handleLogout}
                                            className='text-2xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-300 transition-all'
                                        />
                                    </div>

                                </>
                                :
                                <Spin size="large" />
                        }
                    </div>
                }
            >
                <div className='flex flex-col items-center justify-center '>


                    <Radio.Group>
                        <Radio.Button className='hover:scale-105 transition duration-700' onClick={() => navigate('/companies')} value="large">
                            Companies
                        </Radio.Button>
                        <Radio.Button className='hover:scale-105 transition duration-700' onClick={() => navigate('/products')} value="default">
                            Products</Radio.Button>
                    </Radio.Group>
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
                    {
                        (user.userRole === userRoles.ADMIN || user.userRole === userRoles.PREMIUM)
                        &&
                        <div>
                            <div style={contentStyle} className='flex flex-col items-center justify-center gap-2'>
                                {
                                    <>
                                        <Avatar size={100} src={user.avatar} />
                                        <ArrowDownOutlined className='text-white text-2xl mt-0 justify-center' />
                                        <span> Preview New Avatar</span>

                                        <Avatar
                                            size={40}
                                            src={
                                                avatarLoading
                                                    ?
                                                    <Spin size="large" />
                                                    :
                                                    newAvatarName
                                            }
                                        />

                                        <Form
                                            className="flex flex-col gap-4 mb-6"
                                            layout="vertical"
                                            onFinish={onFinishChangeAvatar}
                                            form={changeAvatarForm}
                                        >
                                            <Form.Item
                                                className='mb-0'
                                                name="newAvatarName"
                                                rules={[
                                                    { required: true, message: "New Avatar Name required" },
                                                    { max: 40, message: "Max. 40 characters." },
                                                ]}
                                            >
                                                <Input onChange={handleChangeAvatar} className='text-center w-[250px]' style={{ borderRadius: "0" }} size="large" placeholder='New Avatar Name' />
                                            </Form.Item>

                                            <Form.Item className="flex justify-center mb-0">
                                                <Button
                                                    className="hover:scale-105 transition duration-700"
                                                    style={{ border: 'none', color:'white', borderRadius: "0", opacity: avatarLoading ? 0.5 : 1, pointerEvents: avatarLoading ? 'none' : 'auto' }}
                                                    type="primary"
                                                    htmlType="submit"
                                                    size="large"
                                                    disabled={avatarLoading}
                                                >
                                                    <strong>CHANGE AVATAR</strong>
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                    </>
                                }

                            </div>
                        </div>
                    }

                    {
                        !(user.userRole === userRoles.VISITOR)
                        &&
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
                    }

                    {
                        !(user.userRole === userRoles.VISITOR)
                        &&

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
                    }

                    <div>
                        <div style={contentStyle} className='flex flex-col items-center justify-center gap-2'>
                            {
                                (user.userRole === userRoles.ADMIN || user.userRole === userRoles.PREMIUM)
                                &&
                                <span className='text-2xl'> PREMIUM ACTIVATED </span>
                            }

                            {
                                (user.userRole === userRoles.STANDARD)
                                &&
                                <>
                                    <span> YOU HAVE STANDARD MEMBERSHIP </span>
                                    <span className='text-2xl'> GET PREMIUM NOW </span>
                                    <FontAwesomeIcon onClick={handleGetPremium} className='hover:cursor-pointer text-4xl text-violet-500 hover:text-violet-400 ' icon={faGem} shake />
                                    <Popover placement="bottom"
                                        content={
                                            <div className='flex flex-col gap-2 text-xs'>
                                                <span className='text-xs'> <PlusOutlined /> <strong>Premium Search</strong> </span>
                                                <span className='text-xs'> <PlusOutlined /> <strong>Change Avatar</strong> </span>
                                            </div>
                                        }
                                    >
                                        <InfoCircleOutlined className='text-md mt-4 hover:scale-125 transition-all' />
                                    </Popover>
                                </>
                            }

                            {
                                (user.userRole === userRoles.VISITOR)
                                &&
                                <>
                                    <span> WELCOME VISITOR </span>
                                    <span> Register to App Now </span>
                                    <strong className=''>{user.email}</strong>
                                    <ArrowDownOutlined className='text-2xl mt-0' />

                                    <Form
                                        className="flex flex-col"
                                        layout="vertical"
                                        onFinish={onFinishRegisterVisitor}
                                        form={registerVisitorForm}
                                    >
                                        <Form.Item
                                            name="userName"
                                            rules={[{ required: true, message: 'Please input your Username!' },
                                            { max: 40, message: "Max. 40 characters." },
                                            {
                                                validator: (_, value) => {
                                                    return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                                                }
                                            }
                                            ]}
                                        >
                                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                                className='w-[250px]'
                                                style={{ borderRadius: "0" }} size="large"
                                                placeholder="Username" />
                                        </Form.Item>

                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please input your password!',

                                                },
                                                { max: 40, message: "Max. 40 characters." },
                                                {
                                                    validator: (_, value) => {
                                                        return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                                                    }
                                                }
                                            ]}
                                            hasFeedback
                                        >
                                            <Input
                                                className='w-[250px]' style={{ borderRadius: "0" }} size="large"
                                                placeholder="Password"
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="confirm"
                                            dependencies={['password']}
                                            hasFeedback
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                { max: 40, message: "Max. 40 characters." },
                                                {
                                                    validator: (_, value) => {
                                                        return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                                                    }
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The new password that you entered do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input
                                                className='w-[250px]' style={{ borderRadius: "0" }} size="large"
                                                placeholder="Confirm Password"
                                                prefix={<LockOutlined className="site-form-item-icon" />}
                                            />
                                        </Form.Item>
                                        <Form.Item className="flex justify-center mb-0">
                                            <Button
                                                className='hover:scale-105 transition duration-700'
                                                style={{ borderRadius: "0" }}
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                            >
                                                <strong> REGISTER </strong>
                                            </Button>
                                        </Form.Item>
                                    </Form>
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
