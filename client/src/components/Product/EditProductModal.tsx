import React from 'react';
import BaseModal from './BaseModal';
import { EditProductModalProps } from './types';

const EditProductModal: React.FC<EditProductModalProps> = ({ selectedCompany, editProductForm, onFinishEditProduct, isEditProductModalOpen, setIsEditProductModalOpen }) => {
    return (
        <BaseModal
            modalTitle="EDIT COMPANY"
            form={editProductForm}
            onFinish={onFinishEditProduct}
            isModalOpen={isEditProductModalOpen}
            setIsModalOpen={setIsEditProductModalOpen}
            submitButtonText="UPDATE"
            selectedCompany= {selectedCompany}
        />
    );
};

export default EditProductModal;
