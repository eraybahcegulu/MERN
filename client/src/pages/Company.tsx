import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
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
import { fetchProductData } from '../redux-toolkit/productSlice';
import AddCompanyModal from '../components/Company/AddCompanyModal';
import EditCompanyModal from '../components/Company/EditCompanyModal';
import ViewDeletedComapinesModal from '../components/Company/ViewDeletedCompaniesModal';

const Company: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addCompanyForm] = Form.useForm();
    const [editCompanyForm] = Form.useForm();

    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState<boolean>(false);
    const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState<boolean>(false);
    const [isViewDeletedCompanies, setIsViewDeletedCompanies] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const company = useSelector((state: RootState) => state.company.data);

    const { user } = useUserData();

    const onFinishAddCompany = async (values: any) => {
        values.creatorId = user.userId;
        try {
            const res = await createCompany(values, user.token);
            successAddCompany(res.data.message)
            dispatch(fetchCompanyData(user.token));
            setIsAddCompanyModalOpen(false);
            setTimeout(() => {
                addCompanyForm.resetFields();
            }, 100);

        } catch (error: any) {
            if (error.response) {
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
            dispatch(fetchProductData(user.token));
            dispatch(fetchCompanyData(user.token));

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

            dispatch(fetchCompanyData(user.token));
            editCompanyForm.resetFields();
            setselectedRowKeys([]);
            setSelectedRows([]);
            setIsEditCompanyModalOpen(false);
        } catch (error: any) {
            if (error.response) {
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

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">

            <div className='flex flex-col items-center gap-4'>

                <span><strong className='text-2xl'>COMPANIES</strong></span>

                <div className="flex flex-row item-center justify-center mt-10 gap-4">
                    <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer hover:opacity-50 hover:scale-125 transition-all text-2xl mr-4" />

                    <Input className='hover:scale-105' onChange={(e) => setSearch(e.target.value.toLowerCase())} size="large" prefix={<SearchOutlined />} />
                    {
                        (user.userRole === 'admin')
                        &&

                        <>
                            {
                                company?.length === 0
                                    ?
                                    <FontAwesomeIcon onClick={() => setIsAddCompanyModalOpen(true)} className='hover:cursor-pointer text-4xl text-green-700 hover:text-green-600 ' icon={faPlus} bounce />
                                    :
                                    <PlusOutlined onClick={() => setIsAddCompanyModalOpen(true)} className="hover:cursor-pointer text-green-700 hover:text-green-600 hover:scale-125 transition-all text-2xl" />
                            }

                            <EditOutlined onClick={isEditCompany} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 hover:scale-125 transition-all text-2xl" />

                            <DeleteOutlined onClick={deleteCompany} className="hover:cursor-pointer text-red-600 hover:text-red-500 hover:scale-125 transition-all text-2xl" />

                            <SyncOutlined onClick={() => setIsViewDeletedCompanies(true)} className="hover:cursor-pointer text-violet-600 hover:text-violet-500 hover:scale-125 transition-all text-2xl" />

                        </>

                    }
                    <LogoutOutlined onClick={logout} className="hover:cursor-pointer  hover:opacity-50 hover:scale-125 transition-all text-2xl" />
                </div>

                <div>
                    <CompanyList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setselectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                <AddCompanyModal addCompanyForm={addCompanyForm} onFinishAddCompany={onFinishAddCompany} isAddCompanyModalOpen={isAddCompanyModalOpen} setIsAddCompanyModalOpen={setIsAddCompanyModalOpen} />
                <EditCompanyModal editCompanyForm={editCompanyForm} onFinishEditCompany={onFinishEditCompany} isEditCompanyModalOpen={isEditCompanyModalOpen} setIsEditCompanyModalOpen={setIsEditCompanyModalOpen} />
                <ViewDeletedComapinesModal isViewDeletedCompanies={isViewDeletedCompanies} setIsViewDeletedCompanies={setIsViewDeletedCompanies} />

            </div>
        </div>
    );
};

export default Company;
