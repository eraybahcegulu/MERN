export interface ProductDataType {
    key: React.Key;
    productName: string;
    productCategory: string;
    productAmount: any;
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

export interface EditProductModalProps {
    onFinishEditProduct: any;
    editProductForm: any;
    isEditProductModalOpen: boolean;
    setIsEditProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCompany: any;
}

export interface AddProductModalProps {
    onFinishAddProduct: any;
    addProductForm: any;
    isAddProductModalOpen: boolean;
    setIsAddProductModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCompany: any;
}

export interface BaseModalProps {
    modalTitle: string;
    form: any;
    onFinish: (values: any) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    submitButtonText: string;
    selectedCompany: any;
}
