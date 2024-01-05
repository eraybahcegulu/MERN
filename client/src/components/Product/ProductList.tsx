import React, { FC } from 'react';

import {  useSelector } from 'react-redux';

import { Spin, Table, Alert } from 'antd';
import {  RootState } from '../../store';

import type { TableRowSelection } from 'antd/es/table/interface';
import { columns  } from './columns';
import { ProductDataType, ProductListProps } from './types';

const ProductList: FC<ProductListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {

    const rowSelection: TableRowSelection<ProductDataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: ProductDataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const product = useSelector((state: RootState) => state.product.data);
    const status = useSelector((state: RootState) => state.product.status);

    const filteredProducts = product?.filter(
        (item: any) =>
            item.productName.toLowerCase().includes(search.trim()) ||
            item.productCategory.toLowerCase().includes(search.trim()) ||
            item.amountUnit.toLowerCase().includes(search.trim()) ||
            item.company.companyName.toLowerCase().includes(search.trim()) 
    ) || [];

    const productColumns = columns(filteredProducts); 

    return (
        <>
            {status === 'loading' && (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            )}

            {status === 'succeeded' && filteredProducts.length > 0 && (
                <Table
                    scroll={{ y: 400 }}
                    className="max-w-[475px] md:max-w-[750px] xl:max-w-[1200px]"
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    rowKey="_id"
                    columns={productColumns}
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
