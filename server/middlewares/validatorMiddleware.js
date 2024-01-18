const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const responseHandler = require('../handlers/responseHandler')

const validLength = (req, res, next) => {
    try {
        const body = req.body;

        for (const key in body) {
            if (body.hasOwnProperty(key)) {
                const data = body[key];
                if (data.length > 40) {
                    return responseHandler.badRequest(res, `Entered values invalid, try again`);
                }
            }
        }
        next();
    } catch (error) {
        console.error(error);
        return responseHandler.serverError(res, 'Server Error');
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
                        return responseHandler.badRequest(res, `Invalid character detected in ${key}, try again`);
                    }
                }
            }
        }

        next();
    } catch (error) {
        console.error(error);
        return responseHandler.serverError(res, 'Server Error');
    }
};

module.exports = { validLength, sanitize };