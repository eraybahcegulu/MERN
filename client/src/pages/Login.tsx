import React, { useState } from 'react';
import { ArrowRightOutlined, LogoutOutlined } from '@ant-design/icons';
import { Form, Modal, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RegisterForm from '../components/Login/RegisterForm';
import LoginForm from '../components/Login/LoginForm';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [isChecked, setChecked] = useState<boolean>(false);
  const [isRegisterModalOpen, setisRegisterModalOpen] = useState<boolean>(false);
  const [registerForm] = Form.useForm();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const onFinishRegister = async (values: any) => {
    try {
      await axios.post(process.env.REACT_APP_API_URL + '/api/user/register', values);
      message.success(
        <span>
          <strong>You have successfully registered</strong>
        </span>
      );
      setisRegisterModalOpen(false);
      setTimeout(() => {
        registerForm.resetFields();
      }, 200);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        message.error(
          <span>
            <strong>This username is already registered</strong>
          </span>
        );
      } else {
        console.error(error);
      }
    }
  };

  const onFinishLogin = async (values: any) => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_URL + '/api/user/login', values);
      const token = res.data.token;
      const securityStamp = res.data.securityStamp;

      if (isChecked === true) {
        localStorage.setItem('token', token);
        localStorage.setItem('securityStamp', securityStamp);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('securityStamp', securityStamp);
      }

      navigate(`/home`, { state: { token } });
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        message.error(
          <span>
            <strong>Invalid username or password</strong>
          </span>
        );
      } else {
        console.error(error);
      }
    }
  };

  const onChange = () => {
    setChecked((prevState) => !prevState);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className='bg-slate-400 h-screen w-screen flex items-center justify-center'>
      {token ? (
        <div className='flex flex-row gap-5'>
          <p className='text-2xl'>Open session found</p>
          <ArrowRightOutlined
            onClick={() => navigate('/home', { state: { token } })}
            className='text-2xl hover:scale-125 cursor-pointer text-blue-500 hover:text-blue-400 transition-all'
          />
          <LogoutOutlined
            onClick={logout}
            className='text-2xl hover:scale-125 cursor-pointer text-red-500 hover:text-red-400 transition-all'
          />
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
  );
};

export default Login;
