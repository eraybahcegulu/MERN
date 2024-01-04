const fs = require('fs');

const logger = (req, res, next) => {
    
    const logData = `\n[${new Date()}] ______ [${req.headers.api_source}] ______ FirstData:[${JSON.stringify(req.firstData)}] ______  ${JSON.stringify(req.body)} ______ ${JSON.stringify(req.params)} \n`;

    fs.appendFile('request_logs.txt', logData, (err) => {
        if (err) {
            console.error('Logging Error', err);
        }
    });
};

module.exports = logger;


