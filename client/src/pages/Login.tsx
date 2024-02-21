import React, { useState } from 'react';
import { ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons';
import { Form, Modal, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/Login/RegisterForm';
import LoginForm from '../components/Login/LoginForm';

import useUser from "../hooks/useUser";
import ForgotPasswordForm from '../components/Login/ForgotPasswordForm';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState<boolean>(false);
  const [registerForm] = Form.useForm();
  const [forgotPasswordForm] = Form.useForm();

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const { register, login, forgotPassword, logout, userResponseLoading } = useUser();

  const onFinishRegister = async (values: any) => {
    await register(values);

    if (!userResponseLoading) {
      setTimeout(() => {
        setIsRegisterModalOpen(false);
        registerForm.resetFields();
      }, 200);
    }
  };

  const onFinishLogin = async (values: any) => {
    login(isChecked, values)
  };

  const onChange = () => {
    setChecked((prevState) => !prevState);
  };

  const onFinishForgotPassword = async (values: any) => {
    forgotPassword(values)
    setIsForgotPasswordModalOpen(false);
    setTimeout(() => {
      forgotPasswordForm.resetFields();
    }, 200);
  };

  const handleLogout = (): void => {
    logout();
  };

  return (
    <main className='bg-gradient-to-b from-[#a774e9] to-[#30164e] py-20 min-h-screen min-w-screen flex items-center justify-center'>
      <div className='py-10 px-20 w-[400px] drop-shadow-2xl bg-gradient-to-b from-[#4a2674] to-[#ab7ee6]' style={{ borderRadius: '20px' }}>
        {token ? (
          <div className='flex flex-col items-center justify-center gap-5'>
            <p className='text-2xl'>Open session found</p>
            <div className='flex flex-row gap-5'>
              <ArrowRightOutlined
                onClick={() => navigate('/home')}
                className='text-5xl hover:scale-125 cursor-pointer text-blue-500 hover:text-blue-400 transition-all'
              />
              <LogoutOutlined
                onClick={handleLogout}
                className='text-5xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-400 transition-all'
              />
            </div>
          </div>
        ) : (
          <>
            <LoginForm
              onFinishLogin={onFinishLogin}
              isChecked={isChecked}
              onChange={onChange}
              setIsRegisterModalOpen={setIsRegisterModalOpen}
              setIsForgotPasswordModalOpen={setIsForgotPasswordModalOpen}
            />

            <Modal open={isRegisterModalOpen} onCancel={() => setIsRegisterModalOpen(false)} footer={false}>
              <h2>
                <strong>REGISTER</strong>
              </h2>
              <RegisterForm onFinishRegister={onFinishRegister} registerForm={registerForm} />
              {
                userResponseLoading
                &&
                <div className='flex justify-center items-center'> <Spin size="large" /> </div>
              }
            </Modal>

            <Modal className='pb-0' open={isForgotPasswordModalOpen} onCancel={() => setIsForgotPasswordModalOpen(false)} centered footer={false}>
              <h2>
                <strong>FORGOT PASSWORD</strong>
              </h2>
              <ForgotPasswordForm onFinishForgotPassword={onFinishForgotPassword} forgotPasswordForm={forgotPasswordForm} />
            </Modal>


          </>
        )}
      </div>
    </main>
  );
};

export default Login;
