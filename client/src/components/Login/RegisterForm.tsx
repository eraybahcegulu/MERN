import React from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
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
                rules={[{ required: true, message: 'Please input your Username!' },
                { max: 40, message: "Max. 40 characters." },
                {
                    validator: (_, value) => {
                        return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                    }
                }
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[{ type: 'email', required: true, message: 'Please input your Email!' },
                { max: 40, message: "Max. 40 characters." }
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                    placeholder="Confirm Password"
                    prefix={<LockOutlined className="site-form-item-icon" />}
                />
            </Form.Item>

            <div className='flex flex-row gap-2 mt-auto'>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button hover:scale-105 transition duration-700">
                        Register
                    </Button>
                </Form.Item>
            </div>
        </Form>

    );
};


export default RegisterForm;    