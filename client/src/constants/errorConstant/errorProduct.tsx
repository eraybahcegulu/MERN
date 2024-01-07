import { errorAddProduct, errorEditProduct, failedServer } from "../notifyConstant/notifyProduct";

const handleAddProductError = (error: any) => {
    if (error.response) {
        errorAddProduct(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleEditProductError = (error: any) => {
    if (error.response) {
        errorEditProduct(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleDeleteProductError = (error: any) => {
    if (error.response) {
        failedServer(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleFetchProductError = (error: any) => {
    if (error.response) {
        failedServer(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

export {
    handleAddProductError,
    handleEditProductError,
    handleDeleteProductError,
    handleFetchProductError
};