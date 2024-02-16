import type { ColumnsType } from 'antd/es/table';
import { CompanyDataType } from './types';
import { Popover } from 'antd';
import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

export const columns = (companyData: CompanyDataType[]) => {

    const companyColumns: ColumnsType<CompanyDataType> = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            filters: companyData.map((item) => ({
                text: item.companyName,
                value: item.companyName,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.companyName.startsWith(value),
            width: '25%',
        },
        {
            title: 'CRN',
            dataIndex: 'crn',
            filters: companyData.map((item) => ({
                text: item.crn,
                value: item.crn,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.crn.startsWith(value),
            width: '25%',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            filters: companyData.map((item) => ({
                text: item.country,
                value: item.country,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.country.startsWith(value),
            width: '25%',
        },
        {
            title: 'WEB Site',
            dataIndex: 'webSite',
            filters: companyData.map((item) => ({
                text: item.webSite,
                value: item.webSite,
            })),
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value: any, record) => record.webSite.startsWith(value),
            width: '25%',
        },
        {
            title: 'Total Product',
            dataIndex: 'products',
            width: '25%',
            sorter: (a, b) => a.products.length - b.products.length,
            render: (_, record) => (
                <div className='flex flex-row'>

                    {
                        record.products.length
                    }

                    {
                        record.products.length > 0
                        &&
                        <Popover
                            placement="right"
                            content={
                                <div className='flex flex-col gap-2 text-xs'>

                                    {record.products.map(product => (
                                        <span key={product._id} className='text-xs'>
                                            <strong>{product.productName}</strong>
                                        </span>
                                    ))}
                                </div>
                            }
                        >
                            <InfoCircleOutlined className='text-xl ml-2 hover:scale-125 transition-all text-blue-600' />
                        </Popover>
                    }

                </div>
            ),
        },
    ];
    return companyColumns;
};