import type { ColumnsType } from 'antd/es/table';
import { CompanyDataType } from './types';

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
    ];
    return companyColumns;
};