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

const successDeleteCompany = (data: any) => {
    notification.open({
        type: 'info',
        message: (
            data
        ),
        duration: 8,
    });
};

export {
    failedServer,
    successAddCompany,
    errorAddCompany,
    infoDeleteCompany,
    infoEditCompany,
    successEditCompany,
    errorEditCompany,
    successDeleteCompany
};