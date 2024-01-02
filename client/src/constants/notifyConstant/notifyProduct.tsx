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

const successDeleteProduct = (data: any) => {
    notification.open({
        type: 'info',
        message: (
            data
        ),
        duration: 8,
    });
};

const notFoundCompany = () => {
    notification.open({
        type: 'info',
        message: (
            <span>
                <strong> Company not found. You must add company for new products </strong>
            </span>
        ),
        duration: 3,
    });
};

export {
    failedServer,
    successAddProduct,
    errorAddProduct,
    infoDeleteProduct,
    infoEditProduct,
    successEditProduct,
    errorEditProduct,
    successDeleteProduct,
    notFoundCompany
};