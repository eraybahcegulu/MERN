const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const validLength = (req, res, next) => {
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

const sanitize = (req, res, next) => {
    try {
        const body = req.body;

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                const data = body[key];
        
                if (typeof data === 'string') {
                    const cleanedData = DOMPurify.sanitize(data, { ALLOWED_TAGS: [] });

                    if (cleanedData !== data) {
                        return res.status(400).json({
                            message: `Invalid character detected in ${key}, try again`,
                        });
                    }
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

module.exports = {validLength, sanitize};
