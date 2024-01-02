import axios from "axios";
import { GET_PRODUCTS_API_URL, ADD_PRODUCT_API_URL, DELETE_PRODUCT_API_URL, UPDATE_PRODUCT_API_URL } from '../constants/apiConstant/apiProduct';

const getProducts = async () => {
    return await axios.get
        (
            GET_PRODUCTS_API_URL,
        );
};

const createProduct = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_PRODUCT_API_URL,

            data,

            {
                headers: {
                    authorization: `${token}`,
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
                    authorization: `${token}`,
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
                    authorization: `${token}`,
                }
            }

        );
};

export { getProducts, createProduct, removeProduct, updateProduct };