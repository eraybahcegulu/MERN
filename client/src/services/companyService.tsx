import axios from "axios";

import { ADD_COMPANY_API_URL, DELETE_COMPANY_API_URL, UPDATE_COMPANY_API_URL } from '../constants/apiConstant';

const createCompany = async (data: any) => {
    return await axios.post(ADD_COMPANY_API_URL, data);
};

const removeCompany = async (id: any) => {
    return await axios.delete(`${DELETE_COMPANY_API_URL}/${id}`);
};

const updateCompany = async (id: any, data: any) => {
    return await axios.put(`${UPDATE_COMPANY_API_URL}/${id}`, data);
};

export { createCompany, removeCompany, updateCompany };