import React from 'react';
import { ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Switch } from 'antd';

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
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <div className='flex flex-row gap-2'>
                <span>Remember Me <ArrowRightOutlined /></span>
                <Switch defaultChecked={isChecked} onChange={onChange} />
            </div>

            <div className='flex flex-row gap-2 mt-4'>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>

                <Button type="primary" ghost onClick={() => setisRegisterModalOpen(true)}>
                    Register
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;