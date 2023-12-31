import axios from "axios";

import { ADD_PRODUCT_API_URL, DELETE_PRODUCT_API_URL, UPDATE_PRODUCT_API_URL } from '../constants/apiConstant';

const createProduct = async (data: any) => {
    return await axios.post(ADD_PRODUCT_API_URL, data);
};

const removeProduct = async (id: any) => {
    return await axios.delete(`${DELETE_PRODUCT_API_URL}/${id}`);
};

const updateProduct = async (id: any, data: any) => {
    return await axios.put(`${UPDATE_PRODUCT_API_URL}/${id}`, data);
};

export { createProduct, removeProduct, updateProduct };