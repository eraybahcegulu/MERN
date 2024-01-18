const handleResponse = (res, statusCode, data) => {
    return res.status(statusCode).json(data);
};

const ok = (res, data) => {
    return handleResponse(res, 200, data);
};

const created = (res, data) => {
    return handleResponse(res, 201, data);
};

const badRequest = (res, message) => {
    return handleResponse(res, 400, { message });
};

const unauthorized = (res, message) => {
    return handleResponse(res, 401, { message });
};

const paymentRequired = (res, message) => {
    return handleResponse(res, 402, { message });
};

const forbidden = (res, message) => {
    return handleResponse(res, 403, { message });
};

const notFound = (res, message) => {
    return handleResponse(res, 404, { message });
};

const requestTimedOut = (res, message) => {
    return handleResponse(res, 408, { message });
};

const serverError = (res, message) => {
    return handleResponse(res, 500, { message });
};

module.exports = {
    ok,
    created,
    badRequest,
    unauthorized,
    paymentRequired,
    forbidden,
    notFound,
    requestTimedOut,
    serverError
};
