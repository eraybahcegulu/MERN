import React from 'react';
import { Alert, Card, Divider, Popover, Spin, Steps } from 'antd';
import { HomeOutlined, InboxOutlined, InfoCircleOutlined, OrderedListOutlined, SwapRightOutlined } from '@ant-design/icons';

import useCompany from '../../hooks/useCompany'
import useProduct from '../../hooks/useProduct'

const Panels = () => {
    const { companies, companiesStatus } = useCompany();
    const { products, productsStatus } = useProduct();
    
    const lastAddedThreeProduct = products ? products.slice(-3) : [];
    const productStepsData = lastAddedThreeProduct.map((product) => ({
        title:
            <span className='text-md'>{product.productName}
                <Popover placement="right"
                    content={
                        <div className='flex flex-col gap-2 text-xs'>
                            <span className='text-xs text-center'> <a className='text-blue-600' href={addDefaultProtocol(product.company.webSite)} target="_blank" rel="noopener noreferrer" > {product.company.webSite} </a> </span>
                            <span className='text-xs '> <strong>Company</strong>  <SwapRightOutlined /> {product.company.companyName} </span>
                            <span className='text-xs '> <strong>Product Category</strong>  <SwapRightOutlined /> {product.productCategory} </span>
                            <span className='text-xs '> <strong>Product Amount</strong>  <SwapRightOutlined /> {product.productAmount} </span>
                            <span className='text-xs '> <strong>Amount Unit</strong>  <SwapRightOutlined /> {product.amountUnit} </span>
                        </div>
                    }
                >
                    <InfoCircleOutlined className='text-md ml-1 hover:scale-125 transition-all' />
                </Popover>
            </span>
    }));

    const lastAddedThreeCompanies = companies ? companies.slice(-3) : [];
    const companyStepsData = lastAddedThreeCompanies.map((company) => ({
        title:
            <span className='text-md'>{company.companyName}
                <Popover placement="right"
                    content={
                        <div className='flex flex-col gap-2 text-xs'>
                            <span className='text-xs '> <strong>Company Registration Number</strong>  <SwapRightOutlined /> {company.crn} </span>
                            <span className='text-xs '> <strong>Incorporation Country</strong>  <SwapRightOutlined /> {company.country} </span>
                            <span className='text-xs '> <strong>WEB Site</strong>
                                <SwapRightOutlined />
                                <a className='text-blue-600' href={addDefaultProtocol(company.webSite)} target="_blank" rel="noopener noreferrer"
                                >
                                    {company.webSite}
                                </a>
                            </span>
                        </div>
                    }
                >
                    <InfoCircleOutlined className='text-md ml-1 hover:scale-125 transition-all' />
                </Popover>
            </span>

    }));

    return (
        <div className='w-[80vw] flex flex-col items-center justify-center gap-4'>
            <div className="grid grid-cols-2 gap-4">
                <Card className='bg-red-400 hover:scale-105 transition-all border-none'>
                    <div className='flex flex-row items-center gap-2'>
                        <HomeOutlined className='text-6xl' />
                        <Divider type="vertical" className='h-16' />
                        <div className='flex flex-col gap-2 '>
                            <span className='text-md'>TOTAL COMPANY</span>
                            <span className='text-2xl'>
                                <strong>
                                    {companiesStatus === 'loading' && <div> <Spin size="large" /> </div>}
                                    {companiesStatus === 'succeeded' &&
                                        (
                                            <span>{companies?.length}</span>

                                        )}
                                    {companiesStatus === 'failed' &&
                                        <Alert message="Error" type="error" />}
                                </strong>
                            </span>
                        </div>
                    </div>
                </Card>

                <Card className='bg-violet-300 hover:scale-105 transition-all border-none'>
                    <div className='flex flex-row items-center gap-2'>
                        <InboxOutlined className='text-6xl' />
                        <Divider type="vertical" className='h-16' />
                        <div className='flex flex-col gap-2 '>
                            <span className='text-md'>TOTAL PRODUCT</span>
                            <span className='text-2xl'>
                                <strong>
                                    {productsStatus === 'loading' && <div> <Spin size="large" /> </div>}
                                    {productsStatus === 'succeeded' &&
                                        (
                                            <span>{products?.length}</span>
                                        )}
                                    {productsStatus === 'failed' &&
                                        <Alert message="Error" type="error" />}
                                </strong>
                            </span>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Card className='bg-orange-200 flex flex-col text-center hover:scale-105 transition-all border-none'>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <OrderedListOutlined className='text-6xl' />
                        <HomeOutlined className='text-6xl' />
                    </div>
                    <Divider />
                    <div className='flex flex-col items-center gap-2 '>
                        <span className='text-xl '>LAST ADDED 3 COMPANIES</span>
                        {companiesStatus === 'loading' && <div> <Spin size="large" /> </div>}
                        {companiesStatus === 'failed' &&
                                        <Alert message="Error" type="error" />}
                        <span>  </span>
                        <Steps
                            className='flex flex-row items-start'
                            progressDot
                            direction="vertical"
                            current={0}
                            items={companyStepsData.reverse()}
                        />
                    </div>
                </Card>
                <Card className='bg-sky-300 flex flex-col text-center hover:scale-105 transition-all border-none'>
                    <div className='flex flex-row items-center justify-center gap-4'>
                        <OrderedListOutlined className='text-6xl' />
                        <InboxOutlined className='text-6xl' />
                    </div>

                    <Divider />

                    <div className='flex flex-col items-center gap-2 '>
                        <span className='text-xl '>LAST ADDED 3 PRODUCTS</span>
                        {productsStatus === 'loading' && <div> <Spin size="large" /> </div>}
                        {productsStatus === 'failed' &&
                                        <Alert message="Error" type="error" />}
                        <Steps
                            className='flex flex-row items-start '
                            progressDot
                            direction="vertical"
                            current={0}
                            items={productStepsData.reverse()}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}

function addDefaultProtocol(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
}

export default Panels