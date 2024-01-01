import type { ColumnsType } from 'antd/es/table';
import { ProductDataType } from './types';

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
        render: (company) => company?.companyName,
        width: '20%',
    },
];
