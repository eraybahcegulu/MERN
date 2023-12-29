import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Result } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import CompanyList from '../components/Company/CompanyList'

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { fetchCompanyData } from '../redux-toolkit/companySlice';

const Company: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addCompanyForm] = Form.useForm();

    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState<boolean>(false);

    const location = useLocation();
    const token = location.state?.token?.toString() || localStorage.getItem('token');
    const [failedAuth, setFailedAuth] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async (): Promise<void> => {
        try {
            const userToken = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const res: AxiosResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/userInfo`,
                userToken
            );

            if (res.data.securitystamp !== (localStorage.getItem('securityStamp') || sessionStorage.getItem('securityStamp'))) {
                localStorage.clear();
                sessionStorage.clear();
                return setFailedAuth(true);
            }


        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                sessionStorage.clear();
                localStorage.clear();
                return setFailedAuth(true);
            } else {
                message.error(
                    <span>
                        <strong> Server Error. </strong>
                    </span>
                );
            }

            console.error(error);
        }
    };


    const onFinishAddCompany = async (values: any) => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + "/api/company/add", values);
            message.success(
                <span>
                    <strong>{values.companyname} </strong> added to companies list.
                </span>
            );
            dispatch(fetchCompanyData());
            setIsAddCompanyModalOpen(false);
            setTimeout(() => {
                addCompanyForm.resetFields();
            }, 100);

        } catch (error) {
            console.log(error);
        }
    };

    const deleteCompany = async () => {
        try {
            if (selectedRowKeys.length === 0) {
                message.info(
                    <span>
                        <strong>Please select the companies to be deleted.</strong>
                    </span>
                );
                return;
            }
            setselectedRowKeys([]);
            await Promise.all(selectedRowKeys.map(id => axios.delete(process.env.REACT_APP_API_URL + `/api/company/delete/${id}`)));
            dispatch(fetchCompanyData());

        } catch (error) {
            console.log(error);
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
            {failedAuth === true || !(sessionStorage.getItem('token') || localStorage.getItem('token')) ? (
                <>
                    <Result
                        status="404"
                        title="404"
                        subTitle="Failed."
                        extra={<Button onClick={handle404} type="primary">Go Login</Button>}
                    />
                </>
            ) : (
                <div className='flex flex-col items-center gap-4'>

                    <span><strong>COMPANIES</strong></span>

                    <div className="flex flex-row item-center justify-center mt-10 gap-4">
                        <ArrowLeftOutlined onClick={() => navigate('/home', { state: { token } })} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl mr-4" />

                        <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />

                        <UserAddOutlined onClick={() => setIsAddCompanyModalOpen(true)} className="hover:cursor-pointer text-green-700 hover:text-green-600 transition-all text-2xl" />

                        <EditOutlined className="hover:cursor-pointer text-blue-600 hover:text-blue-500 transition-all text-2xl" />

                        <DeleteOutlined onClick={deleteCompany} className="hover:cursor-pointer text-red-600 hover:text-red-500 transition-all text-2xl" />

                        <LogoutOutlined onClick={logout} className="hover:cursor-pointer  hover:opacity-50 transition-all text-2xl" />
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
                                name="companyname"
                                label="Company Name"
                                rules={[
                                    { required: true, message: "Ad boş bırakılamaz" },
                                    { max: 20, message: "Ad en fazla 20 karakter olabilir" }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="crn"
                                label="Company Registration Number"
                                rules={[{ required: true, message: "Soyad boş bırakılamaz" },
                                { max: 20, message: "Soyad en fazla 20 karakter olabilir" }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>

                            <Form.Item
                                name="country"
                                label="Country"
                                rules={[{ required: true, message: "Telefon No boş bırakılamaz" },
                                { max: 20, message: "Telefon No en fazla 20 karakter olabilir" }
                                ]}
                            >
                                <Input style={{ borderRadius: "0" }} size="large" />
                            </Form.Item>


                            <Form.Item
                                name="website"
                                label="WEB Site"
                                rules={[{ required: true, message: "Telefon No boş bırakılamaz" },
                                { max: 20, message: "Telefon No en fazla 20 karakter olabilir" }
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
                </div>

            )}
        </div>
    );
};

export default Company;
