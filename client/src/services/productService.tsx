import axios from "axios";
import { GET_PRODUCTS_API_URL, ADD_PRODUCT_API_URL, DELETE_PRODUCT_API_URL, UPDATE_PRODUCT_API_URL } from '../constants/apiConstant/apiProduct';

const getProductsService = async (token: any) => {
    return await axios.get
        (
            GET_PRODUCTS_API_URL,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${GET_PRODUCTS_API_URL}`
                }
            }
        );
};

const addProductService = async (data: any, token: any) => {
    return await axios.post
        (
            ADD_PRODUCT_API_URL,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${ADD_PRODUCT_API_URL}`
                }
            }

        );
};

const deleteProductService = async (id: any, userId: any, token: any) => {
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
                    api_source: `${DELETE_PRODUCT_API_URL}`
                }
            }

        );
};

const updateProductService = async (id: any, data: any, token: any) => {
    return await axios.put
        (
            `${UPDATE_PRODUCT_API_URL}/${id}`,

            data,

            {
                headers: {
                    authorization: `Bearer ${token}`,
                    api_source: `${UPDATE_PRODUCT_API_URL}`
                }
            }

        );
};

export {
    getProductsService,
    addProductService,
    deleteProductService,
    updateProductService
};