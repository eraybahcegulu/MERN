import type { ColumnsType } from 'antd/es/table';
import { CompanyDataType } from './types';

export const companyColumns: ColumnsType<CompanyDataType> = [
    {
        title: 'Company Name',
        dataIndex: 'companyName',
    },
    {
        title: 'CRN',
        dataIndex: 'crn',
    },
    {
        title: 'Country',
        dataIndex: 'country',
    },
    {
        title: 'WEB Site',
        dataIndex: 'webSite',
    },
];