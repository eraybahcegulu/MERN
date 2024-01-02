import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import CompanyList from '../components/Company/CompanyList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

import { createCompany, removeCompany, updateCompany } from '../services/companyService';

import { failedServer } from '../constants/notifyConstant/notifyUser';
import {
    successAddCompany,
    errorAddCompany,
    infoDeleteCompany,
    infoEditCompany,
    successDeleteCompany,
    successEditCompany,
    errorEditCompany
} from '../constants/notifyConstant/notifyCompany';

import { useUserData } from "../contexts/userContext";

const Company: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addCompanyForm] = Form.useForm();
    const [editCompanyForm] = Form.useForm();

    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState<boolean>(false);
    const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState<boolean>(false);



    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const company = useSelector((state: RootState) => state.company.data);

    const { user } = useUserData();

    useEffect(() => {
        dispatch(fetchCompanyData());
    }, []);

    const onFinishAddCompany = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createCompany(values, user.token);
            successAddCompany(res.data.message)
            dispatch(fetchCompanyData());
            setIsAddCompanyModalOpen(false);
            setTimeout(() => {
                addCompanyForm.resetFields();
            }, 100);

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                errorAddCompany(error.response.data.message)
            }
            else {
                failedServer(error.message)
            }

        }
    };

    const deleteCompany = async () => {
        try {
            if (selectedRowKeys.length === 0) {
                infoDeleteCompany();
                return;
            }

            const res = await Promise.all(selectedRowKeys.map(id => removeCompany(id, user.userId, user.token)));
            const messages = res.map(res => res.data.message);

            messages.forEach(message => {

                successDeleteCompany(message);

            });

            setselectedRowKeys([]);
            dispatch(fetchCompanyData());

        } catch (error: any) {
            failedServer(error.message)
        }
    };

    const isEditCompany = async () => {
        if (selectedRowKeys.length !== 1) {
            infoEditCompany();
            return;
        }

        const firstSelectedRow = selectedRows[0];
        editCompanyForm.setFieldsValue({
            companyName: firstSelectedRow.companyName,
            crn: firstSelectedRow.crn,
            country: firstSelectedRow.country,
            webSite: firstSelectedRow.webSite,
        });
        setIsEditCompanyModalOpen(true);
    };

    const onFinishEditCompany = async (values: any) => {
        values.lastUpdaterId = user.userId;
        try {
            const res = await updateCompany(selectedRowKeys, values, user.token);
            successEditCompany(res.data.message);
            dispatch(fetchCompanyData());
            editCompanyForm.resetFields();
            setselectedRowKeys([]);
            setSelectedRows([]);
            setIsEditCompanyModalOpen(false);
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                errorEditCompany(error.response.data.message)
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

                    <span><strong className='text-2xl'>COMPANIES</strong></span>

                    <div className="flex flex-row item-center justify-center mt-10 gap-4">
                        <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer  hover:opacity-50 hover:scale-125 transition-all text-2xl mr-4" />

                        <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />

                        {
                            company.length === 0
                                ?
                                <FontAwesomeIcon onClick={() => setIsAddCompanyModalOpen(true)} className='hover:cursor-pointer text-4xl text-green-700 hover:text-green-600 ' icon={faPlus} bounce />
                                :
                                <PlusOutlined onClick={() => setIsAddCompanyModalOpen(true)} className="hover:cursor-pointer text-green-700 hover:text-green-600 hover:scale-125 transition-all text-2xl" />
                        }

                        <EditOutlined onClick={isEditCompany} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 hover:scale-125 transition-all text-2xl" />

                        <DeleteOutlined onClick={deleteCompany} className="hover:cursor-pointer text-red-600 hover:text-red-500 hover:scale-125 transition-all text-2xl" />

                        <LogoutOutlined onClick={logout} className="hover:cursor-pointer  hover:opacity-50 hover:scale-125 transition-all text-2xl" />
                    </div>

                    <div>
                        <CompanyList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setselectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                    </div>



                    <Modal
                        open={isAddCompanyModalOpen}
                        onCancel={() => setIsAddCompanyModalOpen(false)}
                        footer={false}
                    >
                        <h2>
                            <strong>ADD COMPANY</strong>
                        </h2>
                        <Form
                            className="mt-4 flex flex-col gap-4"
                            layout="vertical"
                            onFinish={onFinishAddCompany}
                            form={addCompanyForm}
                        >
                            <Form.Item
                                name="companyName"
                                label="Company Name"
                                rules={[
                                    { required: true, message: "Company Name required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="crn"
                                label="Company Registration Number"
                                rules={[{ required: true, message: "CRN required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="country"
                                label="Country"
                                rules={[{ required: true, message: "Country required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>


                            <Form.Item
                                name="webSite"
                                label="WEB Site"
                                rules={[{ required: true, message: "WEB Site required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
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
                        open={isEditCompanyModalOpen}
                        onCancel={() => setIsEditCompanyModalOpen(false)}
                        footer={false}
                    >
                        <h2>
                            <strong>EDIT COMPANY</strong>
                        </h2>
                        <Form
                            className="mt-4 flex flex-col gap-4"
                            layout="vertical"
                            onFinish={onFinishEditCompany}
                            form={editCompanyForm}
                        >
                            <Form.Item
                                name="companyName"
                                label="Company Name"
                                rules={[
                                    { required: true, message: "Company Name required" },
                                    { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="crn"
                                label="Company Registration Number"
                                rules={[{ required: true, message: "CRN required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="country"
                                label="Country"
                                rules={[{ required: true, message: "Country required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>


                            <Form.Item
                                name="webSite"
                                label="WEB Site"
                                rules={[{ required: true, message: "WEB Site required" },
                                { max: 40, message: "Max. 40 characters." }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
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

export default Company;
