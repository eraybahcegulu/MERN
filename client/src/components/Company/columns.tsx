import type { ColumnsType } from 'antd/es/table';
import { CompanyDataType } from './types';

export const companyColumns: ColumnsType<CompanyDataType> = [
    {
        title: 'Company Name',
        dataIndex: 'companyName',
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
        onFilter: (value: any, record) => record.companyName.startsWith(value),
        width: '25%',
    },
    {
        title: 'CRN',
        dataIndex: 'crn',
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
        onFilter: (value: any, record) => record.crn.startsWith(value),
        width: '25%',
    },
    {
        title: 'Country',
        dataIndex: 'country',
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
        onFilter: (value: any, record) => record.country.startsWith(value),
        width: '25%',
    },
    {
        title: 'WEB Site',
        dataIndex: 'webSite',
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
        onFilter: (value: any, record) => record.webSite.startsWith(value),
        width: '25%',
    },
];