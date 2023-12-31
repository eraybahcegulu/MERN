import { message } from 'antd';
import React from 'react';

const failedServer = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

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

const successAddCompany = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorAddCompany = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

const infoDeleteCompany = () => {
    message.open({
        type: 'info',
        content: (
            <span>
                <strong>Please select the companies to be deleted.</strong>
            </span>
        ),
        duration: 3,
    });
};

const infoEditCompany = () => {
    message.open({
        type: 'info',
        content: (
            <span>
                Please select <strong> only one company </strong> want to edit
            </span>
        ),
        duration: 3,
    });
};

const successEditCompany = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorEditCompany = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });


const successAddProduct = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorAddProduct = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });


const infoDeleteProduct = () => {
    message.open({
        type: 'info',
        content: (
            <span>
                <strong>Please select the products to be deleted.</strong>
            </span>
        ),
        duration: 3,
    });
};

const infoEditProduct = () => {
    message.open({
        type: 'info',
        content: (
            <span>
                Please select <strong> only one product </strong> want to edit
            </span>
        ),
        duration: 3,
    });
};

const successEditProduct = (data: any) =>
    message.open({
        type: 'success',
        content: data,
        duration: 3,
    });

const errorEditProduct = (data: any) =>
    message.open({
        type: 'error',
        content: data,
        duration: 3,
    });

export {
    failedServer,
    failedGetUserInfo,
    successRegister,
    errorRegister,
    invalidLogin,
    successAddCompany,
    errorAddCompany,
    infoDeleteCompany,
    infoEditCompany,
    successEditCompany,
    errorEditCompany,
    successAddProduct,
    errorAddProduct,
    infoDeleteProduct,
    infoEditProduct,
    successEditProduct,
    errorEditProduct
};