import React, { useState } from 'react';
import { Form, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProductList from '../components/Product/ProductList';

import {
    infoEditProduct,
    notFoundCompany
} from '../constants/notifyConstant/notifyProduct';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AddProductModal from '../components/Product/AddProductModal';
import EditProductModal from '../components/Product/EditProductModal';

import useUserContext from "../hooks/useUserContext";
import useUser from '../hooks/useUser';
import useProduct from '../hooks/useProduct';
import useCompany from '../hooks/useCompany';
import userRoles from '../constants/enums';

const Product: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addProductForm] = Form.useForm();
    const [editProductForm] = Form.useForm();

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const { user } = useUserContext();
    const { products, productsStatus , addProduct, deleteProduct, updateProduct } = useProduct();
    const {  companies } = useCompany();
    const { logout } = useUser();

    const selectedCompany = companies?.map((company: { _id: any; companyName: any; }) => ({
        value: company._id,
        label: company.companyName,
    }));

    const onFinishAddProduct = async (values: any) => {
        addProduct(values)
        setIsAddProductModalOpen(false);
        setTimeout(() => {
            addProductForm.resetFields();
        }, 100);
    };

    const removeProduct = async () => {
        deleteProduct(selectedRowKeys)
        setSelectedRowKeys([]);
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
        updateProduct(selectedRowKeys, values);
        editProductForm.resetFields();
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setIsEditProductModalOpen(false);
    };

    const handleLogout = (): void => {
        logout();
    };

    const handleOpenAddProductModal = (): void => {
        setIsAddProductModalOpen(true);

        if (companies?.length === 0) {
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
                        (user.userRole === userRoles.ADMIN || user.userRole === userRoles.PREMIUM)
                        &&
                        <Input className='hover:scale-105' onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />
                    }

                    {
                        (user.userRole === userRoles.ADMIN)
                        &&
                        <>
                            {
                                products?.length === 0 && productsStatus === 'succeeded'
                                    ?
                                    <FontAwesomeIcon onClick={handleOpenAddProductModal} className='hover:cursor-pointer text-4xl text-green-700 hover:scale-125 hover:text-green-600' icon={faPlus} bounce />
                                    :
                                    <PlusOutlined onClick={handleOpenAddProductModal} className="hover:cursor-pointer text-green-700 hover:text-green-600 hover:scale-125 transition-all text-2xl" />
                            }

                            <EditOutlined onClick={isEditProduct} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 hover:scale-125 transition-all text-2xl" />

                            <DeleteOutlined onClick={removeProduct} className="hover:cursor-pointer text-red-600 hover:text-red-500 hover:scale-125 transition-all text-2xl" />
                        </>
                    }

                    <LogoutOutlined onClick={handleLogout} className="hover:cursor-pointer hover:scale-125 hover:opacity-50 transition-all text-2xl" />
                </div>

                <div>
                    <ProductList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>


                <AddProductModal isAddProductModalOpen={isAddProductModalOpen} setIsAddProductModalOpen={setIsAddProductModalOpen} onFinishAddProduct={onFinishAddProduct} addProductForm={addProductForm} selectedCompany={selectedCompany} />
                <EditProductModal isEditProductModalOpen={isEditProductModalOpen} setIsEditProductModalOpen={setIsEditProductModalOpen} onFinishEditProduct={onFinishEditProduct} editProductForm={editProductForm} selectedCompany={selectedCompany} />

            </div>
        </div>
    );
};

export default Product;
