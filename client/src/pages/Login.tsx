import React, { useState } from 'react'
import { ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Switch, message } from 'antd';
import axios from "axios";
import "../styles/Login.css";

const Login = () => {

  const [isChecked, setChecked] = useState(false);
  const [isRegisterModalOpen, setisRegisterModalOpen] = useState(false);
  const [registerForm] = Form.useForm();

  const onFinishRegister = async (values) => {
    try {

      await axios.post(process.env.REACT_APP_API_URL + "/api/user/register", values);
      message.success(

        <span>
          <strong>You have successfully registered</strong>
        </span>

      );
      setisRegisterModalOpen(false);
      setTimeout(() => {
        registerForm.resetFields();
      }, 200);

    } catch (error) {
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


  const onChange = () => {
    setChecked(prevState => {
      return !prevState;
    });
  };

  return (
    <div className='h-screen w-screen flex items-center justify-center'>

      <Form
        name="normal_login"
        className="login-form flex flex-col gap-2"
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Switch defaultChecked={isChecked} onChange={onChange} />
          </Form.Item>
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


      <Modal
        open={isRegisterModalOpen}
        onCancel={() => setisRegisterModalOpen(false)}
        footer={false}
      >
        <h2>
          <strong>REGISTER</strong>
        </h2>
        <Form
          className="mt-4 flex flex-col gap-2"
          layout="vertical"
          onFinish={onFinishRegister}
          form={registerForm}
        >

          <Form.Item
            name="username"
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
      </Modal>

    </div>
  )
}

export default Login