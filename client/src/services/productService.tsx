import axios from "axios";

import { ADD_PRODUCT_API_URL, DELETE_PRODUCT_API_URL, UPDATE_PRODUCT_API_URL } from '../constants/apiconstant';

const createProduct = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_PRODUCT_API_URL,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }

        );
};

const removeProduct = async (id: any, userId: any, token: any) => {
    return await axios.delete
        (
            `${DELETE_PRODUCT_API_URL}/${id}`,

            {
                data:
                {
                    userId: userId
                },

                headers: {
                    authorization: `Bearer ${token}`,
                }
            }

        );
};

const updateProduct = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${UPDATE_PRODUCT_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }

        );
};

export { createProduct, removeProduct, updateProduct };