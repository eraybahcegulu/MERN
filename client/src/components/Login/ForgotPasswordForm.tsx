import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import React from 'react'
interface ForgotPasswordFormProps {
    onFinishForgotPassword: (values: any) => void;
    forgotPasswordForm: any;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onFinishForgotPassword, forgotPasswordForm }) => {

    return (
        <Form
            className="mt-4 flex flex-col gap-2"
            layout="vertical"
            onFinish={onFinishForgotPassword}
            form={forgotPasswordForm}
        >

            <Form.Item
                name="email"
                rules={[{ type: 'email', required: true, message: 'Please input your Email!' },
                { max: 40, message: "Max. 40 characters." }
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <div className='flex flex-row  mt-auto'>
                <Form.Item className='mb-0'>
                    <Button type="primary" htmlType="submit" className="forgot-password-form-button hover:scale-105 transition duration-700">
                        Send
                    </Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default ForgotPasswordForm