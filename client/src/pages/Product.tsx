import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Result, Select } from 'antd';

import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import ProductList from '../components/Product/ProductList';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

import { fetchProductData } from '../redux-toolkit/productSlice';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

import { createProduct, removeProduct, updateProduct } from '../services/productService';
import { userInfo } from '../services/userService';

import {
    failedServer,
    failedGetUserInfo,
    successAddProduct,
    errorAddProduct,
    infoDeleteProduct,
    infoEditProduct,
    successEditProduct,
    errorEditProduct,
    notFoundCompany,
    successDeleteProduct
} from '../constants/notifyConstant'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Product: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addProductForm] = Form.useForm();
    const [editProductForm] = Form.useForm();

    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState<boolean>(false);

    const location = useLocation();
    const token = location.state?.token?.toString() || localStorage.getItem('token');
    const [failedAuth, setFailedAuth] = useState<boolean>(false);
    const [userId, setUserId] = useState<String>('');

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const company = useSelector((state: RootState) => state.company.data);
    const product = useSelector((state: RootState) => state.product.data);

    const selectedCompany = company.map(company => ({
        value: company._id,
        label: company.companyName,
    }));

    useEffect(() => {
        getUserInfo();
        dispatch(fetchCompanyData());
        dispatch(fetchProductData());
    }, [dispatch]);

    const getUserInfo = async (): Promise<void> => {
        try {
            const res = await userInfo(token);
            setUserId(res.data.id)

            if (res.data.securitystamp !== (localStorage.getItem('securityStamp') || sessionStorage.getItem('securityStamp'))) {
                localStorage.clear();
                sessionStorage.clear();
                return setFailedAuth(true);
            }

        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                failedGetUserInfo(error.response.data.message)
                sessionStorage.clear();
                localStorage.clear();
                return setFailedAuth(true);
            } else {
                failedServer(error.message)
            }
        }
    };

    const onFinishAddProduct = async (values: any) => {
        values.creatorId = userId;
        try {
            const res = await createProduct(values, token);
            successAddProduct(res.data.message)
            dispatch(fetchProductData());
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

            const res = await Promise.all(selectedRowKeys.map(id => removeProduct(id, userId, token)));

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
            dispatch(fetchProductData());

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
        values.lastUpdaterId = userId;
        try {
            const res = await updateProduct(selectedRowKeys, values, token);
            successEditProduct(res.data.message);
            dispatch(fetchProductData());
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
        if(company.length === 0)
        {
            notFoundCompany();
        }
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">
            {failedAuth === true || !(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
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
                        <ArrowLeftOutlined onClick={() => navigate('/home', { state: { token } })} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl mr-4" />

                        <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />

                        {
                            product.length === 0
                            ?
                            <FontAwesomeIcon onClick={() => setIsAddProductModalOpen(true)} className='hover:cursor-pointer text-4xl text-green-700 hover:text-green-600:' icon={faPlus} bounce />
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
