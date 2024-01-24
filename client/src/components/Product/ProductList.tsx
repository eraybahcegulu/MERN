import React, { FC } from 'react';

import { Spin, Table, Alert } from 'antd';

import type { TableRowSelection } from 'antd/es/table/interface';
import { columns  } from './columns';
import { ProductDataType, ProductListProps } from './types';

import useProduct from '../../hooks/useProduct'

const ProductList: FC<ProductListProps> = ({
    search,
    selectedRowKeys,
    setSelectedRowKeys,
    setSelectedRows,
}) => {
    const { products , productsStatus } = useProduct();

    const rowSelection: TableRowSelection<ProductDataType> = {
        selectedRowKeys,
        onChange: (selectedRowKeys: React.Key[], selectedRows: ProductDataType[]) => {

            const stringKeys: string[] = selectedRowKeys.map(key => String(key));

            setSelectedRowKeys(stringKeys);
            setSelectedRows(selectedRows);
        },
    };

    const filteredProducts = products?.filter(
        (item: any) =>
            item.productName.toLowerCase().includes(search.trim()) ||
            item.productCategory.toLowerCase().includes(search.trim()) ||
            item.amountUnit.toLowerCase().includes(search.trim()) ||
            item.company.companyName.toLowerCase().includes(search.trim()) 
    ) || [];

    const productColumns = columns(filteredProducts); 

    return (
        <>
            {productsStatus === 'loading' && (
                <div className="text-center">
                    <Spin size="large" />
                </div>
            )}

            {productsStatus === 'succeeded' && filteredProducts.length > 0 && (
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

            {productsStatus === 'succeeded' && filteredProducts.length === 0 && (
                <Alert message="Product not found" type="warning" />
            )}

            {productsStatus === 'failed' && (
                <Alert message="Server Error" type="error" />
            )}
        </>
    );
};

export default ProductList;
