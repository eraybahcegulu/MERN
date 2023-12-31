const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const db = require('./utils/connectDB')
db.connect();

app.use(express.json());
app.use(cors());

const routes = [
    require('./routes/userRoutes'),
    require('./routes/companyRoutes'),
    require('./routes/productRoutes'),
];

routes.forEach(route => app.use(route));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});