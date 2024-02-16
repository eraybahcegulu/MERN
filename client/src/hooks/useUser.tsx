import useUserContext from './useUserContext';
import {
    changeAvatarService,
    changeEmailService,
    changePasswordService,
    forgotPasswordService,
    getPremiumService,
    loginService,
    registerService,
    registerVisitorService
} from '../services/userService';
import { useNavigate } from 'react-router-dom';
import {
    handleChangeAvatarError,
    handleChangeEmailError,
    handleChangePasswordError,
    handleForgotPasswordError,
    handleGetPremiumError,
    handleInvalidLoginError,
    handleRegisterError,
    handleRegisterVisitorError,
    handleResetPasswordError
} from '../constants/errorConstant/errorUser';
import {
    errorChangeEmail,
    errorChangePassword,
    successChangeAvatar,
    successChangeEmail,
    successChangePassword,
    successForgotPassword,
    successGetPremium,
    successRegister,
    successRegisterVisitor,
    successResetPassword
} from '../constants/notifyConstant/notifyUser';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useUser = () => {
    const navigate = useNavigate();
    const { user, getUser, setIsFirstLogin } = useUserContext();

    const [userResponseLoading, setUserResponseLoading] = useState<boolean>();

    const users = useSelector((state: RootState) => state.users.data);
    const usersStatus = useSelector((state: RootState) => state.users.status);

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
        setUserResponseLoading(true);
        try {
            const res = await registerService(values);
            successRegister(res.data.message);
            setUserResponseLoading(false);
        } catch (error: any) {
            handleRegisterError(error);
            setUserResponseLoading(false);
        }
    };

    const changePassword = async (values: any, resetPasswordToken? : any, resetPasswordUserId? : any) => {
        try {
            if (values.currentPassword === values.newPassword) {
                return errorChangePassword(
                    <span>Current password and new password cannot be the same</span>
                );
            }

            if(resetPasswordToken && resetPasswordUserId)
            {
                try{
                    const res = await changePasswordService(resetPasswordUserId, values, resetPasswordToken);
                    successResetPassword(res.data.message);
                    return true;
                }
                catch (error: any) {
                    handleResetPasswordError(error)
                    return false;
                }
            }
            const res = await changePasswordService(user.userId, values, user.token);
            successChangePassword(res.data.message);
        } catch (error: any) {
            return handleChangePasswordError(error);
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

    const forgotPassword = async (values: any) => {
        try {
            const res = await forgotPasswordService(values);
            successForgotPassword(res.data.message);
        } catch (error: any) {
            handleForgotPasswordError(error);
        }
    };

    const changeAvatar = async (values: any) => {
        try {
            const res = await changeAvatarService(user.userId, values, user.token);
            successChangeAvatar(res.data.message);
            getUser(res.data.token);
        } catch (error: any) {
            handleChangeAvatarError(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }

    return { users, usersStatus, userResponseLoading, login, register, logout, changePassword, changeEmail, registerVisitor, getPremium, forgotPassword, changeAvatar };
};

export default useUser;
