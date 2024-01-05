import { Modal } from 'antd'
import React from 'react'
import { ViewDeletedCompaniesModalProps } from './types';

const ViewDeletedComapinesModal: React.FC<ViewDeletedCompaniesModalProps> = ({ isViewDeletedCompanies, setIsViewDeletedCompanies }) => {
    return (

        <Modal
            open={isViewDeletedCompanies}
            onCancel={() => setIsViewDeletedCompanies(false)}
            footer={false}
        >
            <h2>
                <strong>DELETED COMPANIES</strong>
            </h2>

        </Modal>
    )
}

export default ViewDeletedComapinesModal