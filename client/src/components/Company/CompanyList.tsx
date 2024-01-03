import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import { Spin, Table, Alert } from 'antd';
import { RootState } from '../../store';

import type { TableRowSelection } from 'antd/es/table/interface';

import { CompanyDataType, CompanyListProps } from './types';
import { columns  } from './columns';



const CompanyList: FC<CompanyListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {


    const rowSelection: TableRowSelection<CompanyDataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: CompanyDataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const company = useSelector((state: RootState) => state.company.data);


    const status = useSelector((state: RootState) => state.company.status);



    const filteredCompanies = company.filter(
        (item: any) =>
            item.companyName.toLowerCase().includes(search.trim()) ||
            item.crn.toLowerCase().includes(search.trim()) ||
            item.country.toLowerCase().includes(search.trim()) ||
            item.webSite.toLowerCase().includes(search.trim())
    );

    const columnsCompany = columns(filteredCompanies); 

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
                    className="max-w-[475px] md:max-w-[750px] xl:max-w-[1200px]"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="_id"
                    columns={columnsCompany}
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
