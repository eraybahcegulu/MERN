import React from 'react';
import BaseModal from './BaseModal';
import { EditCompanyModalProps } from './types';

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ editCompanyForm, onFinishEditCompany, isEditCompanyModalOpen, setIsEditCompanyModalOpen }) => {
    return (
        <BaseModal
            modalTitle="EDIT COMPANY"
            form={editCompanyForm}
            onFinish={onFinishEditCompany}
            open={isEditCompanyModalOpen}
            setIsModalOpen={setIsEditCompanyModalOpen}
            submitButtonText="UPDATE"
        />
    );
};

export default EditCompanyModal;
