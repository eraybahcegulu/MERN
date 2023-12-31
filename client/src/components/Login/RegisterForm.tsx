import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

interface RegisterFormProps {
    onFinishRegister: (values: any) => void;
    registerForm: any;
}


const RegisterForm: React.FC<RegisterFormProps> = ({ onFinishRegister, registerForm }) => {
    return (
        <Form
            className="mt-4 flex flex-col gap-2"
            layout="vertical"
            onFinish={onFinishRegister}
            form={registerForm}
        >
            <Form.Item
                name="userName"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input
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
                    placeholder="Confirm Password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <div className='flex flex-row gap-2 mt-auto'>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        Register
                    </Button>
                </Form.Item>
            </div>
        </Form>

    );
};


export default RegisterForm;    