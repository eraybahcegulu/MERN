const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (error) => {
                if (error) {
                    res.status(401).json({
                        message: 'User auth token not valid',
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({
                message: 'User auth token not available',
            });
        }
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
};

module.exports = auth;