import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { BaseModalProps } from './types';

const BaseModal: React.FC<BaseModalProps> = ({ modalTitle, form, onFinish, open, setIsModalOpen, submitButtonText }) => {
    return (
        <Modal
            open={open}
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
                        <strong>{submitButtonText}</strong>
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default BaseModal
