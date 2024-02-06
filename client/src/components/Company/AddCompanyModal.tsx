import React from 'react';
import BaseModal from './BaseModal';
import { AddCompanyModalProps } from './types';

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ addCompanyForm, onFinishAddCompany, isAddCompanyModalOpen, setIsAddCompanyModalOpen }) => {
    return (
        <BaseModal
            modalTitle="ADD COMPANY"
            form={addCompanyForm}
            onFinish={onFinishAddCompany}
            isModalOpen={isAddCompanyModalOpen}
            setIsModalOpen={setIsAddCompanyModalOpen}
            submitButtonText="ADD"
        />
    );
};

export default AddCompanyModal;
