import React from 'react';
import { InfoCircleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Switch } from 'antd';

interface LoginFormProps {
    onFinishLogin: (values: any) => void;
    isChecked: boolean;
    onChange: () => void;
    setisRegisterModalOpen: (isOpen: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onFinishLogin, isChecked, onChange, setisRegisterModalOpen }) => {

    return (
        <Form
            name="normal_login"
            className="login-form flex flex-col gap-2"
            onFinish={onFinishLogin}
            initialValues={{ remember: true }}
        >
            <Form.Item
                name="userNameEmail"
                rules={[{ required: true, message: 'Please input your Username or Email!' },
                { max: 40, message: "Max. 40 characters." }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' },
                { max: 40, message: "Max. 40 characters." }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <div className='flex flex-row gap-1'>
                <Popover placement="left"
                    content={
                        <div className='flex flex-col gap-2 text-xs'>
                            <span><strong>Enabled:</strong> Stay open until your session is terminated</span>
                            <span><strong>Disabled:</strong> Stay open until your close the browser window </span>
                        </div>
                    }
                >

                    <InfoCircleOutlined className='text-md hover:scale-125 transition-all' />
                </Popover>
                <span>Remember Me</span>
                {
                    isChecked
                        ?
                        <span className='ml-0'>Enabled</span>
                        :
                        <span>Disabled</span>
                }
                <Switch className='ml-auto' defaultChecked={isChecked} onChange={onChange} />

            </div>

            <div className='flex flex-row gap-2 mt-4'>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button hover:scale-105 transition duration-700">
                        Log in
                    </Button>
                </Form.Item>

                <Button className='hover:scale-105 transition duration-700' type="primary" ghost onClick={() => setisRegisterModalOpen(true)}>
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;