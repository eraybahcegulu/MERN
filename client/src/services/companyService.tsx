import axios from "axios";
import { ADD_COMPANY_API_URL, DELETE_COMPANY_API_URL, GET_COMPANIES_API_URL, UPDATE_COMPANY_API_URL } from '../constants/apiConstant/apiCompany';

const getCompanies = async (token : any) => {
    return await axios.get
        (
            GET_COMPANIES_API_URL,

            {
                headers: {
                    authorization: `${token}`,
                }
            }
        );
};

const createCompany = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_COMPANY_API_URL,

            data,

            {
                headers: {
                    authorization: `${token}`,
                }
            }

        );
};

const removeCompany = async (id: any, userId: any, token: any) => {
    return await axios.delete
        (
            `${DELETE_COMPANY_API_URL}/${id}`,

            {
                data:
                {
                    userId: userId,

                },

                headers: {
                    authorization: `${token}`,
                }
            }
        );
};

const updateCompany = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${UPDATE_COMPANY_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `${token}`,
                }
            }

        );
};

export { getCompanies, createCompany, removeCompany, updateCompany };