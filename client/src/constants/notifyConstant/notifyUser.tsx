import { message, notification } from 'antd';
import React from 'react';

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

    const successRegisterVisitor = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorRegisterVisitor = (data: any) =>
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

    const errorChangeEmail = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const successChangeEmail = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

    const successEmailConfirm = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

    const firstLoginNotify= (data: any) => {
        notification.open({
            type: 'info',
            message: (
                <span>
                    <strong> Hi {data}, welcome to app </strong>
                </span>
            ),
            duration: 15,
        });
    };

export {
    failedServer,
    failedGetUserInfo,
    successRegister,
    errorRegister,
    successRegisterVisitor,
    errorRegisterVisitor,
    invalidLogin,
    errorChangePassword,
    successChangePassword,
    errorChangeEmail,
    successChangeEmail,
    successEmailConfirm,
    firstLoginNotify
};