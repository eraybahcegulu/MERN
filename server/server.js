const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const db = require('./utils/connectDB')
db.connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});