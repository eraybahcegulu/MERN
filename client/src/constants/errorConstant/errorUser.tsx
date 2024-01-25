import { errorChangeEmail, errorChangePassword, errorGetPremium, errorRegister, errorRegisterVisitor, failedServer, invalidLogin } from "../notifyConstant/notifyUser";

const handleRegisterError = (error: any) => {
    if (error.response) {
        errorRegister(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleRegisterVisitorError = (error: any) => {
    if (error.response) {
        errorRegisterVisitor(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleInvalidLoginError = (error: any) => {
    if (error.response) {
        invalidLogin(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleFailedServerUserError = (error: any) => {
    if (error.response) {
        failedServer(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleChangePasswordError = (error: any) => {
    if (error.response) {
        errorChangePassword(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleChangeEmailError = (error: any) => {
    if (error.response) {
        errorChangeEmail(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleChangeEmailConfirmError = (error: any) => {
    if (error.response) {
        errorChangeEmail(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};

const handleGetPremiumError = (error: any) => {
    if (error.response) {
        errorGetPremium(error.response.data.message);
    } else {
        failedServer(error.message);
    }
};
export {
    handleRegisterError,
    handleRegisterVisitorError,
    handleInvalidLoginError,
    handleFailedServerUserError,
    handleChangePasswordError,
    handleChangeEmailError,
    handleChangeEmailConfirmError,
    handleGetPremiumError
};