const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const db = require('./utils/connectDB')
db.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials : true
}));

const routes = [
    require('./routes/userRoutes'),
    require('./routes/companyRoutes'),
    require('./routes/productRoutes'),
];

routes.forEach(route => app.use(route));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});