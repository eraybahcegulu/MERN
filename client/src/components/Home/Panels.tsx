import React from 'react';
import { Alert, Card, Divider, Spin } from 'antd'
import { HomeOutlined, InboxOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Panels = () => {
    const product = useSelector((state: RootState) => state.product.data);
    const company = useSelector((state: RootState) => state.company.data);

    const productStatus = useSelector((state: RootState) => state.product.status);
    const companyStatus = useSelector((state: RootState) => state.company.status);

    return (
        <div className='w-[80vw] flex flex-wrap items-center justify-center gap-4'>

            <Card >
                <div className='flex flex-row items-center gap-2'>
                    <HomeOutlined className='text-6xl' />
                    <Divider type="vertical" className='h-16' />
                    <div className='flex flex-col gap-2 '>
                        <span className='text-xl'>TOTAL COMPANY</span>
                        <span className='text-2xl'>
                            <strong>
                                {companyStatus === 'loading' && <div> <Spin size="large" /> </div>}
                                {companyStatus === 'succeeded' &&
                                    (
                                        <span>{company.length}</span>
                                    )}
                                {companyStatus === 'failed' &&
                                    <Alert message="Error" type="error" />}
                            </strong>
                        </span>
                    </div>
                </div>
            </Card>

            <Card>
                <div className='flex flex-row items-center gap-2'>
                    <InboxOutlined className='text-6xl' />
                    <Divider type="vertical" className='h-16' />
                    <div className='flex flex-col gap-2 '>
                        <span className='text-xl'>TOTAL PRODUCTS</span>
                        <span className='text-2xl'>
                            <strong>
                                {productStatus === 'loading' && <div> <Spin size="large" /> </div>}
                                {productStatus === 'succeeded' &&
                                    (
                                        <span>{product.length}</span>
                                    )}
                                {productStatus === 'failed' &&
                                    <Alert message="Error" type="error" />}
                            </strong>
                        </span>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default Panels