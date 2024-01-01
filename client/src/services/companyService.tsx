import axios from "axios";

import { ADD_COMPANY_API_URL, DELETE_COMPANY_API_URL, UPDATE_COMPANY_API_URL } from '../constants/apiconstant';

const createCompany = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_COMPANY_API_URL,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
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
                    authorization: `Bearer ${token}`,
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
                    authorization: `Bearer ${token}`,
                }
            }

        );
};

export { createCompany, removeCompany, updateCompany };