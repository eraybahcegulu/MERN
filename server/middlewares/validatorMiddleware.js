const validator = async (req, res, next) => {
    try {
        const body = req.body;

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                const data = body[key];
                if (data.length > 40) {
                    return res.status(400).json({
                        message: `Entered values invalid, try again `,
                    });
                }
            }
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
        });
    }
};

module.exports = validator;
