import { message } from 'antd';

const failedServer = (data: any) => {
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    }
    );
}

const failedGetUserInfo = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const successRegister = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorRegister = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const invalidLogin = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const errorChangePassword = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const successChangePassword = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

export {
    failedServer,
    failedGetUserInfo,
    successRegister,
    errorRegister,
    invalidLogin,
    errorChangePassword,
    successChangePassword
};