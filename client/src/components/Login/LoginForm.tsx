import React from 'react';
import { GithubOutlined, GoogleOutlined, InfoCircleOutlined, LockOutlined, TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
interface LoginFormProps {
    onFinishLogin: (values: any) => void;
    isChecked: boolean;
    onChange: () => void;
    setIsRegisterModalOpen: (isOpen: boolean) => void;
    setIsForgotPasswordModalOpen: (isOpen: boolean) => void;
}

const loginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self")
}

const loginWithDiscord = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/discord/callback`, "_self")
}


const LoginForm: React.FC<LoginFormProps> = ({ onFinishLogin, isChecked, onChange, setIsRegisterModalOpen, setIsForgotPasswordModalOpen }) => {

    return (
        <>

            <Form
                name="normal_login"
                className="login-form flex flex-col gap-2"
                onFinish={onFinishLogin}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="userNameEmail"
                    rules={[{ required: true, message: 'Please input your Username or Email!' },
                    { max: 40, message: "Max. 40 characters." },
                    {
                        validator: (_, value) => {
                            return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                        }
                    }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' },
                    { max: 40, message: "Max. 40 characters." },
                    {
                        validator: (_, value) => {
                            return (/^[^<> ]*$/.test(value)) ? Promise.resolve() : Promise.reject(new Error("Invalid character detected."));
                        }
                    }
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
                                <strong> Registration required for Remember Me feature </strong>
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

                <div className='flex flex-row gap-2 mt-2'>
                    <Form.Item className='mb-0'>
                        <Button type="primary" htmlType="submit" className="login-form-button hover:scale-105 transition duration-700">
                            Log in
                        </Button>
                    </Form.Item>

                    <Button className='hover:scale-105 transition duration-700' type="primary" ghost onClick={() => setIsRegisterModalOpen(true)}>
                        Register
                    </Button>



                </div>
                <div className='mt-2 '>
                    <span className='hover:text-blue-600 cursor-pointer transition-all' onClick={() => setIsForgotPasswordModalOpen(true)} >
                        Forgot Password?
                    </span>
                </div>

            </Form>

            <div className='flex flex-col gap-3 mt-3'>
                <div className='flex flex-row border border-black rounded-md
            gap-1 p-2 items-center justify-center cursor-pointer hover:scale-105 transition duration-700'
                    onClick={loginWithGoogle} >
                    <GoogleOutlined className='text-3xl' />
                    <span> Visit with Google</span>
                </div>

                <div className='flex flex-row  border border-black rounded-md
            gap-1 p-2 items-center justify-center cursor-pointer hover:scale-105 transition duration-700'
                    onClick={loginWithDiscord} >
                    <FontAwesomeIcon icon={faDiscord} className='text-3xl' />
                    <span> Visit with Discord</span>
                </div>

                <div className='flex flex-row  border border-black rounded-md
            gap-1 p-2 items-center justify-center cursor-pointer hover:scale-105 transition duration-700'
                    onClick={loginWithDiscord} >
                    <GithubOutlined className='text-3xl' />
                    <span> Visit with Github</span>
                </div>


                <div className='flex flex-row  border border-black rounded-md
            gap-1 p-2 items-center justify-center cursor-pointer hover:scale-105 transition duration-700'
                    onClick={loginWithDiscord} >
                    <TwitterOutlined className='text-3xl' />
                    <span> Visit with Twitter</span>
                </div>
            </div>


        </>
    );
};

export default LoginForm;