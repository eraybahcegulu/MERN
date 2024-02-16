import React, { FC } from 'react';

import { Spin, Table, Alert, Button } from 'antd';

import type { TableRowSelection } from 'antd/es/table/interface';

import { CompanyDataType, CompanyListProps } from './types';
import { columns } from './columns';

import useCompany from '../../hooks/useCompany'
import exportToExcel from '../../utils/exportToExcel';
import { DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';

const CompanyList: FC<CompanyListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {

    const { companies, companiesStatus } = useCompany();

    const rowSelection: TableRowSelection<CompanyDataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: CompanyDataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const filteredCompanies = companies?.filter(
        (item: any) =>
            item.companyName.toLowerCase().includes(search.trim()) ||
            item.crn.toLowerCase().includes(search.trim()) ||
            item.country.toLowerCase().includes(search.trim()) ||
            item.webSite.toLowerCase().includes(search.trim())
    ) || [];

    const columnsCompany = columns(filteredCompanies);

    const handleExportExcel = () => {
        exportToExcel(filteredCompanies, columnsCompany, 'companies');
    };


    return (
        <>
            {companiesStatus === 'loading' && (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            )}

            {companiesStatus === 'succeeded' && filteredCompanies.length > 0 && (
                <>
                    <Table
                        scroll={{ y: 630, x: 800 }}
                        className="max-w-[475px] md:max-w-[750px] xl:max-w-[1200px]"
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        rowKey="_id"
                        columns={columnsCompany}
                        dataSource={filteredCompanies}
                    />
                    <div className='flex flex-row justify-end items-center'> <Button className=' flex items-center hover:scale-105 transition-all' type="primary" icon={<DownloadOutlined />} onClick={handleExportExcel}>
                        Export to Excel <FileExcelOutlined />
                    </Button>
                    </div>
                </>
            )}

            {companiesStatus === 'succeeded' && filteredCompanies.length === 0 && (
                <Alert message="Company not found" type="warning" />
            )}

            {companiesStatus === 'failed' && (
                <Alert message="Server Error" type="error" />
            )}
        </>
    );
};

export default CompanyList;
