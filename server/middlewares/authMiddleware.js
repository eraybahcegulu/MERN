const jwt = require('jsonwebtoken');
const userRole = require("../models/enums/userRoles");

const auth = async (req, res, next) => {
    try {
        //console.log(req.headers)
        //console.log(req.body)
        const token = req.headers.authorization.split(' ')[1];

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
                if (error) {
                    return res.status(401).json({
                        message: 'User auth token not valid',
                    });
                } else {
                    req.user = decodedToken;
                    next();
                }
            });
        } else {
            return res.status(401).json({
                message: 'User auth token not available',
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Unauthorized`,
        });
    }
};

const requireAdmin = (req, res, next) => {
    //console.log(req.user);
    try {
        //console.log(req.user.userRole);
        if (req.user.userRole !== userRole.ADMIN) {
            return res.status(401).json({ message: `Required Admin Authority ${req.headers.api_source}` });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: `Unauthorized ${req.headers.api_source}`,
        });
    }
};



module.exports = { auth, requireAdmin };