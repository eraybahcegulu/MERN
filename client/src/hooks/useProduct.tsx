import useUserContext from './useUserContext';
import useCompanySlice from './useCompanySlice';
import useProductSlice from './useProductSlice';
import { createProduct, removeProduct, updateProduct } from '../services/productService';
import { infoDeleteProduct, successAddProduct, successDeleteProduct, successEditProduct } from '../constants/notifyConstant/notifyProduct';
import { handleAddProductError, handleDeleteProductError, handleEditProductError } from '../constants/errorConstant/errorProduct';
import React from 'react';

const useProduct = () => {
    const { user } = useUserContext();
    const { fetchCompany } = useCompanySlice();
    const { fetchProduct } = useProductSlice();

    const addProduct = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createProduct(values, user.token);
            successAddProduct(res.data.message)
            fetchCompany(user.token)
            fetchProduct(user.token)
        } catch (error: any) {
            handleAddProductError(error);
        }
    };

    const deleteProduct = async (selectedRowKeys: any) => {
        try {
            if (selectedRowKeys.length === 0) {
                infoDeleteProduct();
                return;
            }

            const res = await Promise.all(selectedRowKeys.map((id: any) => removeProduct(id, user.userId, user.token)));

            if (res.length > 1) {
                successDeleteProduct(
                    <span>
                        {res.length} products deleted successfully
                    </span>
                );
            }
            if (res.length === 1) {
                successDeleteProduct(
                    <span>
                        Product deleted successfully
                    </span>
                );
            }
            fetchProduct(user.token)
            fetchCompany(user.token)
        } catch (error: any) {
            handleDeleteProductError(error)
        }
    };

    const editProduct = async (selectedRowKeys: any, values: any) => {
        values.lastUpdaterId = user.userId;
        try {
            const res = await updateProduct(selectedRowKeys, values, user.token);
            successEditProduct(res.data.message);
            fetchProduct(user.token)
            fetchCompany(user.token)
        } catch (error: any) {
            handleEditProductError(error);
        }
    };
    
    return { addProduct, deleteProduct, editProduct };
};

export default useProduct;