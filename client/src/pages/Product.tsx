import React, { useState } from 'react';
import { Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProductList from '../components/Product/ProductList';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fetchProductData } from '../redux-toolkit/productSlice';

import { createProduct, removeProduct, updateProduct } from '../services/productService';

import {
    successAddProduct,
    infoDeleteProduct,
    successDeleteProduct,
    infoEditProduct,
    successEditProduct,
    notFoundCompany
} from '../constants/notifyConstant/notifyProduct';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useUser from "../hooks/useUser";
import AddProductModal from '../components/Product/AddProductModal';
import EditProductModal from '../components/Product/EditProductModal';
import { handleAddProductError, handleEditProductError, handleDeleteProductError } from '../constants/errorConstant/errorProduct';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

const Product: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addProductForm] = Form.useForm();
    const [editProductForm] = Form.useForm();

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const company = useSelector((state: RootState) => state.company.data);
    const product = useSelector((state: RootState) => state.product.data);
    const status = useSelector((state: RootState) => state.product.status);

    const selectedCompany = company?.map((company: { _id: any; companyName: any; }) => ({
        value: company._id,
        label: company.companyName,
    }));

    const { user } = useUser();

    const onFinishAddProduct = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createProduct(values, user.token);
            successAddProduct(res.data.message)
            dispatch(fetchProductData(user.token));
            dispatch(fetchCompanyData(user.token));
            setIsAddProductModalOpen(false);
            setTimeout(() => {
                addProductForm.resetFields();
            }, 100);

        } catch (error: any) {
            handleAddProductError(error);
        }
    };

    const deleteProduct = async () => {
        try {
            if (selectedRowKeys.length === 0) {
                infoDeleteProduct();
                return;
            }

            const res = await Promise.all(selectedRowKeys.map(id => removeProduct(id, user.userId, user.token)));

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

            setselectedRowKeys([]);
            dispatch(fetchProductData(user.token));
            dispatch(fetchCompanyData(user.token));

        } catch (error: any) {
            handleDeleteProductError(error)
        }
    };

    const isEditProduct = async () => {
        if (selectedRowKeys.length !== 1) {
            infoEditProduct();
            return;
        }

        const firstSelectedRow = selectedRows[0];
        editProductForm.setFieldsValue({
            productName: firstSelectedRow.productName,
            productCategory: firstSelectedRow.productCategory,
            productAmount: firstSelectedRow.productAmount,
            amountUnit: firstSelectedRow.amountUnit,
            company: firstSelectedRow.company._id,
        });
        setIsEditProductModalOpen(true);
    };

    const onFinishEditProduct = async (values: any) => {
        values.lastUpdaterId = user.userId;
        try {
            const res = await updateProduct(selectedRowKeys, values, user.token);
            successEditProduct(res.data.message);
            dispatch(fetchProductData(user.token));
            dispatch(fetchCompanyData(user.token));
            editProductForm.resetFields();
            setselectedRowKeys([]);
            setSelectedRows([]);
            setIsEditProductModalOpen(false);
        } catch (error: any) {
            handleEditProductError(error);
        }
    };

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    const handleOpenAddProductModal = (): void => {
        setIsAddProductModalOpen(true);

        if (company?.length === 0) {
            notFoundCompany();
        }

    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            <div className='flex flex-col items-center gap-4'>
                <span><strong className='text-2xl'>PRODUCTS</strong></span>

                <div className="flex flex-row item-center justify-center mt-10 gap-4">
                    <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer hover:scale-125 hover:opacity-50 transition-all text-2xl mr-4" />

                    {
                        (user.userRole === 'admin' || user.userRole === 'premium')
                        &&
                        <Input className='hover:scale-105' onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />
                    }

                    {
                        (user.userRole === 'admin')
                        &&
                        <>
                            {
                                product?.length === 0 && status === 'succeeded'
                                    ?
                                    <FontAwesomeIcon onClick={handleOpenAddProductModal} className='hover:cursor-pointer text-4xl text-green-700 hover:scale-125 hover:text-green-600' icon={faPlus} bounce />
                                    :
                                    <PlusOutlined onClick={handleOpenAddProductModal} className="hover:cursor-pointer text-green-700 hover:text-green-600 hover:scale-125 transition-all text-2xl" />
                            }

                            <EditOutlined onClick={isEditProduct} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 hover:scale-125 transition-all text-2xl" />

                            <DeleteOutlined onClick={deleteProduct} className="hover:cursor-pointer text-red-600 hover:text-red-500 hover:scale-125 transition-all text-2xl" />
                        </>
                    }

                    <LogoutOutlined onClick={logout} className="hover:cursor-pointer hover:scale-125 hover:opacity-50 transition-all text-2xl" />
                </div>

                <div>
                    <ProductList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setselectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>


                <AddProductModal isAddProductModalOpen={isAddProductModalOpen} setIsAddProductModalOpen={setIsAddProductModalOpen} onFinishAddProduct={onFinishAddProduct} addProductForm={addProductForm} selectedCompany={selectedCompany} />
                <EditProductModal isEditProductModalOpen={isEditProductModalOpen} setIsEditProductModalOpen={setIsEditProductModalOpen} onFinishEditProduct={onFinishEditProduct} editProductForm={editProductForm} selectedCompany={selectedCompany} />

            </div>
        </div>
    );
};

export default Product;
