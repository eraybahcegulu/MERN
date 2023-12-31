import axios from "axios";

import {REGISTER_API_URL, LOGIN_API_URL, GET_USER_INFO_API_URL} from '../constants/apiConstant';

const register = async (data: any) =>{
    return await axios.post(`${REGISTER_API_URL}`, data)
}

const login = async (data: any) =>{
    return await axios.post(`${LOGIN_API_URL}`, data)
}

const userInfo = async (token: any) =>{
    return await axios.post(`${GET_USER_INFO_API_URL}`, token)
}

export { register, login, userInfo };