import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { BaseModalProps } from './types';

const BaseModal: React.FC<BaseModalProps> = ({ modalTitle, isModalOpen, setIsModalOpen, onFinish, form, submitButtonText, selectedCompany}) => {
    return (
        <Modal
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
        >
            <h2>
                <strong>{modalTitle}</strong>
            </h2>
            <Form
                className="mt-4 flex flex-col gap-4"
                layout="vertical"
                onFinish={onFinish}
                form={form}
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
                    { max: 40, message: "Max. 40 characters." },
                    {
                        pattern: /^[0-9]+$/,
                        message: "Only number for Product Amount",
                    },
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
                        <strong> {submitButtonText} </strong>
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BaseModal;
