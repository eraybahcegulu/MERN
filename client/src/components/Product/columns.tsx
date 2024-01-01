import type { ColumnsType } from 'antd/es/table';
import { ProductDataType } from './types';
import React from 'react';
import { Popover } from 'antd';
import { InfoCircleOutlined, SwapRightOutlined } from '@ant-design/icons';

export const productColumns: ColumnsType<ProductDataType> = [
    {
        title: 'Product Name',
        dataIndex: 'productName',
        filters: [
            {
                text: 'Filter 1',
                value: 'Filter 1',
            },
            {
                text: 'Filter 2',
                value: 'Filter 2',
            },
            {
                text: 'Filter 3',
                value: 'Filter 3',
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value: any, record) => record.productName.startsWith(value),
        width: '30%',
    },
    {
        title: 'Product Category',
        dataIndex: 'productCategory',
        width: '30%',
    },
    {
        title: 'Product Amount',
        dataIndex: 'productAmount',
        sorter: (a, b) => a.productAmount - b.productAmount,
        width: '30%',
    },
    {
        title: 'Amount Unit',
        dataIndex: 'amountUnit',
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
    },
];

function addDefaultProtocol(url: string) {
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
}