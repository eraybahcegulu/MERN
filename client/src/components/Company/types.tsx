export interface CompanyDataType {
    key: React.Key;
    companyName: string;
    crn: string;
    country: string;
    webSite: string;
}

export interface CompanyListProps {
    search: string;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    selectedRows: CompanyDataType[];
    setSelectedRows: (rows: CompanyDataType[]) => void;
}