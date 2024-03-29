const jwt = require('jsonwebtoken');
const userRoles = require("../models/enums/userRoles");

const responseHandler = require('../handlers/responseHandler')

const auth = async (req, res, next) => {
    try {
        //console.log(req.headers)
        //console.log(req.body)
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
                if (error) {
                    return responseHandler.unauthorized(res, 'User auth token not valid');
                } else {
                    req.user = decodedToken;
                    next();
                }
            });
        } else {
            return responseHandler.unauthorized(res, 'User auth token not available');
        }
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, `Unauthorized ${req.headers.api_source}`);
    }
};

const requireAdmin = (req, res, next) => {
    //console.log(req.user);
    try {
        //console.log(req.user.userRole);
        if (req.user.userRole !== userRoles.ADMIN) {
            return responseHandler.unauthorized(res, `Required admin authority ${req.headers.api_source}`);
        }
        next();
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, `Unauthorized ${req.headers.api_source}`);
    }
};

const requirePremium = (req, res, next) => {
    //console.log(req.user);
    try {
        //console.log(req.user.userRole);
        if (req.user.userRole !== userRoles.PREMIUM && req.user.userRole !== userRoles.ADMIN) {
            return responseHandler.unauthorized(res, `Required premium membership authority ${req.headers.api_source}`);
        }
        next();
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, `Unauthorized ${req.headers.api_source}`);
    }
};

module.exports = { auth, requireAdmin, requirePremium };