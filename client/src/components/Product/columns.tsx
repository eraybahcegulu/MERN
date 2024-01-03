import type { ColumnsType } from 'antd/es/table';
import { ProductDataType } from './types';
import React from 'react';
import { Popover } from 'antd';
import { InfoCircleOutlined, SwapRightOutlined } from '@ant-design/icons';

export const columns = (productData: ProductDataType[]) => {

    const productColumns: ColumnsType<ProductDataType> = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            filters: productData.map((item) => ({
                text: item.productName,
                value: item.productName,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.productName.startsWith(value),
            width: '30%',
        },
        {
            title: 'Product Category',
            dataIndex: 'productCategory',
            filters: productData.map((item) => ({
                text: item.productCategory,
                value: item.productCategory,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.productCategory.startsWith(value),
            width: '30%',
        },
        {
            title: 'Product Amount',
            dataIndex: 'productAmount',
            sorter: (a, b) => a.productAmount - b.productAmount,
            filters: productData.map((item) => ({
                text: item.productAmount,
                value: item.productAmount,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.productAmount.startsWith(value),
            width: '30%',
        },
        {
            title: 'Amount Unit',
            dataIndex: 'amountUnit',
            filters: productData.map((item) => ({
                text: item.amountUnit,
                value: item.amountUnit,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.amountUnit.startsWith(value),
            width: '25%',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            render: (company) =>
                <div className='flex flex-row gap-1'>
                    <span>
                        <Popover className='text-xl' placement="left"
                            content={
                                <div className='flex flex-col gap-2 text-xs'>
                                    <span className='text-xs '> <strong>Company Registration Number</strong>  <SwapRightOutlined /> {company?.crn} </span>
                                    <span className='text-xs '> <strong>Incorporation Country</strong>  <SwapRightOutlined /> {company.country} </span>
                                    <span className='text-xs '>
                                        <strong>WEB Site</strong>
                                        <SwapRightOutlined />
                                        <a className='text-blue-600' href={addDefaultProtocol(company.webSite)} target="_blank" rel="noopener noreferrer" > {company.webSite} </a>
                                    </span>
                                </div>
                            }
                        >

                            <InfoCircleOutlined className='text-md hover:scale-125 transition-all text-blue-600' />
                        </Popover>
                    </span>
                    <span>
                        {company?.companyName}
                    </span>


                </div>,
            width: '20%',
            filters: productData.map((item) => ({
                text: item.company.companyName,
                value: item.company.companyName,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.company.companyName.startsWith(value),
        },
    ];
    return productColumns;
};
function addDefaultProtocol(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
}