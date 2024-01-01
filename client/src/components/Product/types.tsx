export interface ProductDataType {
    key: React.Key;
    productName: string;
    productCategory: string;
    productAmount: number;
    amountUnit: string;
    company: {
        companyName: string;
    };
}

export interface ProductListProps {
    search: string;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    selectedRows: ProductDataType[];
    setSelectedRows: (rows: ProductDataType[]) => void;
}
