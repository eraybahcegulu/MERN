import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Result, Select } from 'antd';

import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProductList from '../components/Product/ProductList';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fetchProductData } from '../redux-toolkit/productSlice';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

import { createProduct, removeProduct, updateProduct } from '../services/productService';


import { failedServer } from '../constants/notifyConstant/notifyUser';
import {
    successAddProduct,
    errorAddProduct,
    infoDeleteProduct,
    successDeleteProduct,
    infoEditProduct,
    successEditProduct,
    errorEditProduct,
    notFoundCompany
} from '../constants/notifyConstant/notifyProduct';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUserData } from "../contexts/userContext";

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

    const selectedCompany = company.map(company => ({
        value: company._id,
        label: company.companyName,
    }));

    const { user } = useUserData();

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    useEffect(() => {
        dispatch(fetchCompanyData(token));
        dispatch(fetchProductData(token));
    }, []);

    const onFinishAddProduct = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createProduct(values, user.token);
            successAddProduct(res.data.message)
            dispatch(fetchProductData(token));
            setIsAddProductModalOpen(false);
            setTimeout(() => {
                addProductForm.resetFields();
            }, 100);

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                errorAddProduct(error.response.data.message)
            }
            else {
                failedServer(error.message)
            }
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
            dispatch(fetchProductData(token));

        } catch (error: any) {
            failedServer(error.message)
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
            dispatch(fetchProductData(token));
            editProductForm.resetFields();
            setselectedRowKeys([]);
            setSelectedRows([]);
            setIsEditProductModalOpen(false);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                errorEditProduct(error.response.data.message)
            }
            else {
                failedServer(error.message)
            }
        }
    };

    const logout = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    const handle404 = (): void => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
    };

    const handleOpenAddProductModal = (): void => {
        setIsAddProductModalOpen(true);
        
        if (company.length === 0) {
            notFoundCompany();
        }
        
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {!(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
                <>
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button onClick={handle404} type="primary">Go Login</Button>}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center gap-4'>
                    <span><strong className='text-2xl'>PRODUCTS</strong></span>

                    <div className="flex flex-row item-center justify-center mt-10 gap-4">
                        <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl mr-4" />

                        <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />

                        {
                            product.length === 0
                                ?
                                <FontAwesomeIcon onClick={handleOpenAddProductModal} className='hover:cursor-pointer text-4xl text-green-700 hover:text-green-600:' icon={faPlus} bounce />
                                :
                                <PlusOutlined onClick={handleOpenAddProductModal} className="hover:cursor-pointer text-green-700 hover:text-green-600 transition-all text-2xl" />
                        }


                        <EditOutlined onClick={isEditProduct} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 transition-all text-2xl" />

                        <DeleteOutlined onClick={deleteProduct} className="hover:cursor-pointer text-red-600 hover:text-red-500 transition-all text-2xl" />

                        <LogoutOutlined onClick={logout} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl" />
                    </div>

                    <div>
                        <ProductList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setselectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                    </div>



                    <Modal
                        open={isAddProductModalOpen}
                        onCancel={() => setIsAddProductModalOpen(false)}
                        footer={false}
                    >
                        <h2>
                            <strong>ADD PRODUCT</strong>
                        </h2>
                        <Form
                            className="mt-4 flex flex-col gap-4"
                            layout="vertical"
                            onFinish={onFinishAddProduct}
                            form={addProductForm}
                        >
                            <Form.Item
                                name="productName"
                                label="Product Name"
                                rules={[
                                    { required: true, message: "Product Name required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="productCategory"
                                label="Category"
                                rules={[{ required: true, message: "Category required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="productAmount"
                                label="Product Amount"
                                rules={[{ required: true, message: "Product Amount required" },
                                { max: 40, message: "Max. 40 characters." },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: "Only number for Product Amount",
                                },
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>


                            <Form.Item
                                name="amountUnit"
                                label="Amount Unit"
                                rules={[{ required: true, message: "Amount Unit required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="company"
                                label="Company"
                                rules={[
                                    { required: true, message: "Company required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Select style={{ borderRadius: "0" }} size="large" options={selectedCompany} />
                            </Form.Item>

                            <Form.Item className="flex justify-end mb-0">
                                <Button
                                    style={{ borderRadius: "0" }}
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    <strong> ADD </strong>
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        open={isEditProductModalOpen}
                        onCancel={() => setIsEditProductModalOpen(false)}
                        footer={false}
                    >
                        <h2>
                            <strong>EDIT PRODUCT</strong>
                        </h2>
                        <Form
                            className="mt-4 flex flex-col gap-4"
                            layout="vertical"
                            onFinish={onFinishEditProduct}
                            form={editProductForm}
                        >
                            <Form.Item
                                name="productName"
                                label="Product Name"
                                rules={[
                                    { required: true, message: "Product Name required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="productCategory"
                                label="Category"
                                rules={[{ required: true, message: "Category required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="productAmount"
                                label="Product Amount"
                                rules={[{ required: true, message: "Product Amount required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>


                            <Form.Item
                                name="amountUnit"
                                label="Amount Unit"
                                rules={[{ required: true, message: "Amount Unit required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="company"
                                label="Company"
                                rules={[
                                    { required: true, message: "Company required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Select style={{ borderRadius: "0" }} size="large" options={selectedCompany} />
                            </Form.Item>

                            <Form.Item className="flex justify-end mb-0">
                                <Button
                                    style={{ borderRadius: "0" }}
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    <strong> UPDATE </strong>
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>

            )}
        </div>
    );
};

export default Product;
