const moment = require('moment');

const dateNow = () => {
    const dateNow = new moment().format('YYYY-MM-DD HH:mm:ss');
    return dateNow;
};

module.exports = { dateNow };