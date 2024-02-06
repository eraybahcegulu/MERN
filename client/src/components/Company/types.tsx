export interface CompanyDataType {
    key: React.Key;
    companyName: string;
    crn: string;
    country: string;
    webSite: string;
    products: Array<any>;
}

export interface CompanyListProps {
    search: string;
    selectedRowKeys: string[];
    setSelectedRowKeys: (keys: string[]) => void;
    selectedRows: CompanyDataType[];
    setSelectedRows: (rows: CompanyDataType[]) => void;
}

export interface EditCompanyModalProps {
    editCompanyForm: any;
    onFinishEditCompany: (values: any) => void;
    isEditCompanyModalOpen: boolean;
    setIsEditCompanyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AddCompanyModalProps {
    addCompanyForm: any;
    onFinishAddCompany: (values: any) => void;
    isAddCompanyModalOpen: boolean;
    setIsAddCompanyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ViewDeletedCompaniesModalProps {
    isViewDeletedCompanies: boolean;
    setIsViewDeletedCompanies: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface BaseModalProps {
    modalTitle: string;
    form: any;
    onFinish: (values: any) => void;
    open: boolean;
    setIsModalOpen: (open: boolean) => void;
    submitButtonText: string;
}