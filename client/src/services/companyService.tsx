import axios from "axios";
import { ADD_COMPANY_API_URL, DELETE_COMPANY_API_URL, GET_COMPANIES_API_URL, UPDATE_COMPANY_API_URL } from '../constants/apiConstant/apiCompany';

const getCompaniesService = async (token: any) => {
    return await axios.get
        (
            GET_COMPANIES_API_URL,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${GET_COMPANIES_API_URL}`
                }
            }
        );
};

const addCompanyService = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_COMPANY_API_URL,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${ADD_COMPANY_API_URL}`
                }
            }

        );
};

const deleteCompanyService = async (id: any, userId: any, token: any) => {
    return await axios.delete
        (
            `${DELETE_COMPANY_API_URL}/${id}`,

            {
                data:
                {
                    userId: userId,

                },

                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${DELETE_COMPANY_API_URL}`
                }
            }
        );
};

const updateCompanyService = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${UPDATE_COMPANY_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${UPDATE_COMPANY_API_URL}`
                }
            }

        );
};

export {
    getCompaniesService,
    addCompanyService,
    deleteCompanyService,
    updateCompanyService
};