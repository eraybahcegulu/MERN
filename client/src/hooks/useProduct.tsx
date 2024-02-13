import useUserContext from './useUserContext';
import useSlice from './useSlice';
import { addProductService, deleteProductService, updateProductService } from '../services/productService';
import { infoDeleteProduct, successAddProduct, successDeleteProduct, successEditProduct } from '../constants/notifyConstant/notifyProduct';
import { handleAddProductError, handleDeleteProductError, handleEditProductError } from '../constants/errorConstant/errorProduct';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useProduct = () => {
    const { user } = useUserContext();
    const { fetchCompanies, fetchProducts } = useSlice();

    const products = useSelector((state: RootState) => state.products.data);
    const productsStatus = useSelector((state: RootState) => state.products.status);

    const addProduct = async (values: any) => {
        values.createdBy = user.userId;
        try {
            const res = await addProductService(values, user.token);
            successAddProduct(res.data.message)
            fetchCompanies(user.token)
            fetchProducts(user.token)
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

            const res = await Promise.all(selectedRowKeys.map((id: any) => deleteProductService(id, user.userId, user.token)));

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
            fetchProducts(user.token)
            fetchCompanies(user.token)
        } catch (error: any) {
            handleDeleteProductError(error)
        }
    };

    const updateProduct = async (selectedRowKeys: any, values: any) => {
        values.lastUpdatedBy = user.userId;
        try {
            const res = await updateProductService(selectedRowKeys, values, user.token);
            successEditProduct(res.data.message);
            fetchProducts(user.token)
            fetchCompanies(user.token)
        } catch (error: any) {
            handleEditProductError(error);
        }
    };
    
    return { products, productsStatus, addProduct, deleteProduct, updateProduct };
};

export default useProduct;