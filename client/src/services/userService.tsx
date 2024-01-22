import axios from "axios";
import { GET_USER_INFO_API_URL, REGISTER_API_URL, LOGIN_API_URL, CHANGE_PASSWORD_API_URL, CHANGE_EMAIL_API_URL, EMAIL_CONFIRM_API_URL, REGISTER_VISITOR_API_URL } from '../constants/apiConstant/apiUser';

const register = async (data: any) => {
    return await axios.post
        (
            REGISTER_API_URL,

            data
        )
}

const login = async (data: any) => {
    return await axios.post
        (
            LOGIN_API_URL,

            data
        )
}

const emailConfirm = async (emailConfirmToken: any) => {
    return await axios.get
        (
            `${EMAIL_CONFIRM_API_URL}/${emailConfirmToken}`
        )
}

const userInfo = async (token: any) => {
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

const changePassword = async (id: any, data: any, token: any) => {
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

const changeEmail = async (id: any, data: any, token: any) => {
    return await axios.put
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

const registerVisitor = async (id: any, data: any, token: any) => {
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

export { register, emailConfirm, login, userInfo, changePassword, changeEmail, registerVisitor };