import React, { useState } from 'react';
import { ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons';
import { Form, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/Login/RegisterForm';
import LoginForm from '../components/Login/LoginForm';

import { register, login } from '../services/userService';
import { successRegister } from '../constants/notifyConstant/notifyUser'

import useUserContext from "../hooks/useUserContext";
import useLogout from '../hooks/useLogout';

import { handleInvalidLoginError, handleRegisterError } from '../constants/errorConstant/errorUser';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isRegisterModalOpen, setisRegisterModalOpen] = useState<boolean>(false);
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const { getUser, setIsFirstLogin } = useUserContext();
  const { logout } = useLogout();

  const onFinishRegister = async (values: any) => {
    try {
      const res = await register(values);
      successRegister(res.data.message);
      setisRegisterModalOpen(false);
      setTimeout(() => {
        registerForm.resetFields();
      }, 200);
    } catch (error: any) {
      handleRegisterError(error);
    }
  };

  const onFinishLogin = async (values: any) => {
    try {
      const res = await login(values);
      const token = res.data.token;
      //console.log(res.data)
      //console.log(res.data.isFirstLogin);

      if(res.data.isFirstLogin)
      {
        setIsFirstLogin(true);
      }

      if (isChecked === true) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      await getUser(token);
      //console.log(res)

      navigate(`/home`,)

    } catch (error: any) {
      handleInvalidLoginError(error);
    }
  };

  const onChange = () => {
    setChecked((prevState) => !prevState);
  };

    const handleLogout = (): void => {
        logout();
    };


  return (
    <div className='bg-slate-400 h-screen w-screen flex items-center justify-center'>
      <div className='p-20 w-[400px] h-[375px] drop-shadow-2xl bg-indigo-100' style={{ borderRadius: '20px' }}>
        {token ? (
          <div className='flex flex-col items-center gap-5'>
            <p className='text-2xl'>Open session found</p>
            <div className='flex gap-5'>
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
              setisRegisterModalOpen={setisRegisterModalOpen}
            />

            <Modal open={isRegisterModalOpen} onCancel={() => setisRegisterModalOpen(false)} footer={false}>
              <h2>
                <strong>REGISTER</strong>
              </h2>
              <RegisterForm onFinishRegister={onFinishRegister} registerForm={registerForm} />
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
