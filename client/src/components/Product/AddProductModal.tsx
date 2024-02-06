import React from 'react';
import BaseModal from './BaseModal';
import { AddProductModalProps } from './types';

const AddProductModal: React.FC<AddProductModalProps> = ({ selectedCompany, addProductForm, onFinishAddProduct, isAddProductModalOpen, setIsAddProductModalOpen }) => {
    return (
        <BaseModal
            modalTitle="ADD COMPANY"
            form={addProductForm}
            onFinish={onFinishAddProduct}
            isModalOpen={isAddProductModalOpen}
            setIsModalOpen={setIsAddProductModalOpen}
            submitButtonText="ADD"
            selectedCompany= {selectedCompany}
        />
    );
};

export default AddProductModal;
