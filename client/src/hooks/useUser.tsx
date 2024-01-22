import useUserContext from './useUserContext';
import { changeEmail, changePassword, login, register, registerVisitor } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { handleChangeEmailError, handleChangePasswordError, handleInvalidLoginError, handleRegisterError, handleRegisterVisitorError } from '../constants/errorConstant/errorUser';
import { errorChangeEmail, errorChangePassword, successChangeEmail, successChangePassword, successRegister, successRegisterVisitor } from '../constants/notifyConstant/notifyUser';
import React from 'react';

const useUser = () => {
    const navigate = useNavigate();
    const { user, getUser, setIsFirstLogin } = useUserContext();

    const signin = async (isChecked: any, values: any) => {
        try {
            const res = await login(values);
            const token = res.data.token;

            if (res.data.isFirstLogin) {
                setIsFirstLogin(true);
            }

            if (isChecked === true) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            await getUser(token);

            navigate(`/home`,)

        } catch (error: any) {
            handleInvalidLoginError(error);
        }
    };

    const signup = async (values: any) => {
        try {
            const res = await register(values);
            successRegister(res.data.message);
        } catch (error: any) {
            handleRegisterError(error);
        }
    };

    const changePass = async (values: any) => {
        try {
            if (values.currentPassword === values.newPassword) {
                return errorChangePassword(
                    <span>Current password and new password cannot be the same</span>
                );
            }
            const res = await changePassword(user.userId, values, user.token);
            successChangePassword(res.data.message);
        } catch (error: any) {
            handleChangePasswordError(error);
        }
    };

    const modifyEmail = async (values: any) => {
        try {
            if (values.newEmail === user.email) {
                return errorChangeEmail(
                    <span>New email and current email cannot be the same</span>
                );
            }
            const res = await changeEmail(user.userId, values, user.token);
            successChangeEmail(res.data.message);
            getUser(res.data.token);
        } catch (error: any) {
            handleChangeEmailError(error);
        }
    };

    const signupVisitor = async (values: any) => {
        try {
            const res = await registerVisitor(user.userId, values, user.token);
            successRegisterVisitor(res.data.message);
            getUser(res.data.token);
        } catch (error: any) {
            handleRegisterVisitorError(error);
        }
    };

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    }

    return { signin, signup, logout, changePass, modifyEmail, signupVisitor};
};

export default useUser;
