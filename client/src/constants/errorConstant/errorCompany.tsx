import { errorAddCompany, errorEditCompany, failedServer } from "../notifyConstant/notifyCompany";

const handleAddCompanyError = (error: any) => {
    if (error.response) {
        errorAddCompany(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleEditCompanyError = (error: any) => {
    if (error.response) {
        errorEditCompany(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleDeleteCompanyError = (error: any) => {
    if (error.response) {
        failedServer(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleFetchCompanyError = (error: any) => {
    if (error.response) {
        failedServer(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

export {
    handleAddCompanyError,
    handleEditCompanyError,
    handleDeleteCompanyError,
    handleFetchCompanyError
};