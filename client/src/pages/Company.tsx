import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, LogoutOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import CompanyList from '../components/Company/CompanyList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { infoEditCompany } from '../constants/notifyConstant/notifyCompany';

import AddCompanyModal from '../components/Company/AddCompanyModal';
import EditCompanyModal from '../components/Company/EditCompanyModal';

import useUserContext from "../hooks/useUserContext";
import useCompany from "../hooks/useCompany";
import useUser from '../hooks/useUser';
import userRoles from '../constants/enums';

const Company: React.FC = () => {
    const [search, setSearch] = useState<string>("");
    const [selectedRowKeys, setselectedRowKeys] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const [addCompanyForm] = Form.useForm();
    const [editCompanyForm] = Form.useForm();

    const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState<boolean>(false);
    const [isEditCompanyModalOpen, setIsEditCompanyModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const { user } = useUserContext();
    const { companies, companiesStatus, addCompany, deleteCompany, updateCompany } = useCompany();
    const { logout } = useUser();

    const onFinishAddCompany = async (values: any) => {
        addCompany(values);
        setIsAddCompanyModalOpen(false);
        setTimeout(() => {
            addCompanyForm.resetFields();
        }, 100);
    };

    const removeCompany = async () => {
        deleteCompany(selectedRowKeys)
        setselectedRowKeys([]);
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
        updateCompany(selectedRowKeys, values)
        editCompanyForm.resetFields();
        setselectedRowKeys([]);
        setSelectedRows([]);
        setIsEditCompanyModalOpen(false);
    };

    const handleLogout = (): void => {
        logout();
    };

    return (
        <div className="bg-slate-400 h-screen w-screen flex flex-col items-center pt-20">

            <div className='flex flex-col items-center gap-4'>

                <span><strong className='text-2xl'>COMPANIES</strong></span>

                <div className="flex flex-row item-center justify-center mt-10 gap-4">
                    <ArrowLeftOutlined onClick={() => navigate('/home')} className="hover:cursor-pointer hover:opacity-50 hover:scale-125 transition-all text-2xl mr-4" />

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
                                companies?.length === 0 && companiesStatus === 'succeeded'
                                    ?
                                    <FontAwesomeIcon onClick={() => setIsAddCompanyModalOpen(true)} className='hover:cursor-pointer text-4xl text-green-700 hover:text-green-600 ' icon={faPlus} bounce />
                                    :
                                    <PlusOutlined onClick={() => setIsAddCompanyModalOpen(true)} className="hover:cursor-pointer text-green-700 hover:text-green-600 hover:scale-125 transition-all text-2xl" />
                            }

                            <EditOutlined onClick={isEditCompany} className="hover:cursor-pointer text-blue-600 hover:text-blue-500 hover:scale-125 transition-all text-2xl" />

                            <DeleteOutlined onClick={removeCompany} className="hover:cursor-pointer text-red-600 hover:text-red-500 hover:scale-125 transition-all text-2xl" />

                        </>

                    }
                    <LogoutOutlined onClick={handleLogout} className="hover:cursor-pointer  hover:opacity-50 hover:scale-125 transition-all text-2xl" />
                </div>

                <div>
                    <CompanyList search={search} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setselectedRowKeys} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>

                <AddCompanyModal addCompanyForm={addCompanyForm} onFinishAddCompany={onFinishAddCompany} isAddCompanyModalOpen={isAddCompanyModalOpen} setIsAddCompanyModalOpen={setIsAddCompanyModalOpen} />
                <EditCompanyModal editCompanyForm={editCompanyForm} onFinishEditCompany={onFinishEditCompany} isEditCompanyModalOpen={isEditCompanyModalOpen} setIsEditCompanyModalOpen={setIsEditCompanyModalOpen} />

            </div>
        </div>
    );
};

export default Company;
