import axios from "axios";
import {
    GET_USER_INFO_API_URL,
    REGISTER_API_URL, LOGIN_API_URL,
    CHANGE_PASSWORD_API_URL,
    CHANGE_EMAIL_API_URL,
    EMAIL_CONFIRM_API_URL,
    REGISTER_VISITOR_API_URL,
    CHANGE_EMAIL_CONFIRM_API_URL,
    GET_PREMIUM_API_URL,
    GET_USERS_API_URL,
    FORGOT_PASSWORD_API_URL,
    RESET_PASSWORD_API_URL
} from '../constants/apiConstant/apiUser';

const registerService = async (data: any) => {
    return await axios.post
        (
            REGISTER_API_URL,

            data
        )
}

const loginService = async (data: any) => {
    return await axios.post
        (
            LOGIN_API_URL,

            data
        )
}

const emailConfirmService = async (emailConfirmToken: any) => {
    return await axios.get
        (
            `${EMAIL_CONFIRM_API_URL}/${emailConfirmToken}`
        )
}

const userInfoService = async (token: any) => {
    return await axios.get
        (
            GET_USER_INFO_API_URL,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${GET_USER_INFO_API_URL}`
                }
            }
        )
}

const changePasswordService = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${CHANGE_PASSWORD_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${CHANGE_PASSWORD_API_URL}`
                }
            }
        )
}

const changeEmailService = async (id: any, data: any, token: any) => {
    return await axios.post
        (
            `${CHANGE_EMAIL_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${CHANGE_EMAIL_API_URL}`
                }
            }
        )
}

const changeEmailConfirmService = async (changeEmailConfirmToken: any) => {
    return await axios.get
        (
            `${CHANGE_EMAIL_CONFIRM_API_URL}/${changeEmailConfirmToken}`
        )
}

const registerVisitorService = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${REGISTER_VISITOR_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${REGISTER_VISITOR_API_URL}`
                }
            }
        )
}

const getPremiumService = async (id: any, token: any) => {
    return await axios.post
        (
            `${GET_PREMIUM_API_URL}/${id}`,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${GET_PREMIUM_API_URL}`
                }
            }
        )
}

const getUsersService = async (token: any) => {
    return await axios.get
        (
            GET_USERS_API_URL,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${GET_USERS_API_URL}`
                }
            }
        );
};

const forgotPasswordService = async (data: any) => {
    return await axios.post
        (
            FORGOT_PASSWORD_API_URL,

            data
        )
}

const resetPasswordService = async (resetPasswordToken: any) => {
    return await axios.get
        (
            `${RESET_PASSWORD_API_URL}/${resetPasswordToken}`,

            /* 
            {
                 withCredentials: true
             }
             */
        )
}


export {
    registerService,
    emailConfirmService,
    loginService,
    userInfoService,
    changePasswordService,
    changeEmailService,
    changeEmailConfirmService,
    registerVisitorService,
    getPremiumService,
    getUsersService,
    forgotPasswordService,
    resetPasswordService
};