import useUserContext from './useUserContext';
import {
    changeEmailService,
    changePasswordService,
    getPremiumService,
    loginService,
    registerService,
    registerVisitorService
} from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {
    handleChangeEmailError,
    handleChangePasswordError,
    handleGetPremiumError,
    handleInvalidLoginError,
    handleRegisterError,
    handleRegisterVisitorError
} from '../constants/errorConstant/errorUser';
import {
    errorChangeEmail,
    errorChangePassword,
    successChangeEmail,
    successChangePassword,
    successGetPremium,
    successRegister,
    successRegisterVisitor
} from '../constants/notifyConstant/notifyUser';
import React from 'react';

const useUser = () => {
    const navigate = useNavigate();
    const { user, getUser, setIsFirstLogin } = useUserContext();

    const login = async (isChecked: any, values: any) => {
        try {
            const res = await loginService(values);
            const token = res.data.token;

            if (res.data.isFirstLogin) {
                setIsFirstLogin(true);
            }

            const storageType = isChecked ? localStorage : sessionStorage;
            storageType.setItem('token', token);
            
            await getUser(token);

            navigate(`/home`,)

        } catch (error: any) {
            handleInvalidLoginError(error);
        }
    };

    const register = async (values: any) => {
        try {
            const res = await registerService(values);
            successRegister(res.data.message);
        } catch (error: any) {
            handleRegisterError(error);
        }
    };

    const changePassword = async (values: any) => {
        try {
            if (values.currentPassword === values.newPassword) {
                return errorChangePassword(
                    <span>Current password and new password cannot be the same</span>
                );
            }
            const res = await changePasswordService(user.userId, values, user.token);
            successChangePassword(res.data.message);
        } catch (error: any) {
            handleChangePasswordError(error);
        }
    };

    const changeEmail = async (values: any) => {
        try {
            if (values.newEmail === user.email) {
                return errorChangeEmail(
                    <span>New email and current email cannot be the same</span>
                );
            }
            const res = await changeEmailService(user.userId, values, user.token);
            successChangeEmail(res.data.message);

        } catch (error: any) {
            handleChangeEmailError(error);
        }
    };

    const registerVisitor = async (values: any) => {
        try {
            const res = await registerVisitorService(user.userId, values, user.token);
            successRegisterVisitor(res.data.message);
            getUser(res.data.token);
        } catch (error: any) {
            handleRegisterVisitorError(error);
        }
    };

    const getPremium = async () => {
        try {
            const res = await getPremiumService(user.userId, user.token);
            successGetPremium(res.data.message);
            getUser(res.data.token);
        } catch (error: any) {
            handleGetPremiumError(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }

    return { login, register, logout, changePassword, changeEmail, registerVisitor, getPremium };
};

export default useUser;
