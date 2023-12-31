import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { Spin, Table, Alert } from 'antd';
import { RootState } from '../../store';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface CompanyListProps {
    search: string;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    selectedRows: any[];
    setSelectedRows: (rows: any[]) => void;
}

const CompanyList: FC<CompanyListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {

    interface DataType {
        key: React.Key;
        companyName: string;
        crn: string;
        country: string;
        webSite: string;
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const company = useSelector((state: RootState) => state.company.data);
    const status = useSelector((state: RootState) => state.company.status);

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
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

    const filteredCompanies = company.filter(
        (item: any) =>
            item.companyName.includes(search.trim()) ||
            item.crn.includes(search.trim()) ||
            item.country.includes(search.trim())
    );

    return (
        <>
            {status === 'loading' && (
                <div className="text-center">
                    {' '}
                    <Spin size="large" />{' '}
                </div>
            )}

            {status === 'succeeded' && filteredCompanies.length > 0 && (
                <Table
                    scroll={{ y: 400 }}
                    className="md:max-w-[750px] max-w-[450px]"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredCompanies}
                />
            )}

            {status === 'succeeded' && filteredCompanies.length === 0 && (
                <Alert message="Company not found" type="warning" />
            )}

            {status === 'failed' && (
                <Alert message="Server Error" type="error" />
            )}
        </>
    );
};

export default CompanyList;