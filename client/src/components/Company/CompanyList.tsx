import React, { FC } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyData } from '../../redux-toolkit/companySlice';
import { Spin, Table, Alert } from 'antd';
import { AppDispatch, RootState } from '../../store';
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
        name: string;
        crn: string;
        country: string;
        website: string;
    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const dispatch = useDispatch<AppDispatch>();

    const company = useSelector((state: RootState) => state.company.data);
    const status = useSelector((state: RootState) => state.company.status);

    useEffect(() => {
        dispatch(fetchCompanyData());
    }, [dispatch]);


    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'companyname',
        },
        {
            title: 'CRM',
            dataIndex: 'crn',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'WEB Site',
            dataIndex: 'website',
        },
    ];

    const filteredCompanies = company.filter(
        (item: any) =>
            item.companyname.includes(search.trim()) ||
            item.crn.includes(search.trim())
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
