const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid'); // npm install nanoid@^3.0.0 - Version 3 supporting require syntax

const generateId = () => {
    const id = uuidv4();
    return id;
};

const generateShortId = () =>{
    const id = nanoid(5);
    return id;
}

module.exports = { generateId, generateShortId };