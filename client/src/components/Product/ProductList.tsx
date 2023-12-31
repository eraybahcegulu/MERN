import React, { FC } from 'react';

import {  useSelector } from 'react-redux';


import { Spin, Table, Alert } from 'antd';
import {  RootState } from '../../store';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface ProductListProps {
    search: string;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    selectedRows: any[];
    setSelectedRows: (rows: any[]) => void;
}

const ProductList: FC<ProductListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {

    interface DataType {
        key: React.Key;

    }

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };



    const product = useSelector((state: RootState) => state.product.data);
    const status = useSelector((state: RootState) => state.product.status);



    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'productName',
        },
        {
            title: 'Category',
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

    const filteredProducts = product.filter(
        (item: any) =>
            item.productName.includes(search.trim()) ||
            item.productCategory.includes(search.trim()) ||
            item.productAmount.includes(search.trim()) ||
            item.amountUnit.includes(search.trim()) ||
            item.company.includes(search.trim()) 
    );

    return (
        <>
            {status === 'loading' && (
                <div className="text-center">
                    {' '}
                    <Spin size="large" />{' '}
                </div>
            )}

            {status === 'succeeded' && filteredProducts.length > 0 && (
                <Table
                    scroll={{ y: 400 }}
                    className="md:max-w-[750px] max-w-[450px]"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="_id"
                    columns={columns}
                    dataSource={filteredProducts}
                />
            )}

            {status === 'succeeded' && filteredProducts.length === 0 && (
                <Alert message="Product not found" type="warning" />
            )}

            {status === 'failed' && (
                <Alert message="Server Error" type="error" />
            )}
        </>
    );
};

export default ProductList;
