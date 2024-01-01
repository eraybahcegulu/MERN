import type { ColumnsType } from 'antd/es/table';
import { ProductDataType } from './types';

export const productColumns: ColumnsType<ProductDataType> = [
    {
        title: 'Product Name',
        dataIndex: 'productName',
    },
    {
        title: 'Product Category',
        dataIndex: 'productCategory',
    },
    {
        title: 'Product Amount',
        dataIndex: 'productAmount',
    },
    {
        title: 'Amount Unit',
        dataIndex: 'amountUnit',
    },
    {
        title: 'Company',
        dataIndex: 'company',
        render: (company) => company?.companyName,
    },
];
