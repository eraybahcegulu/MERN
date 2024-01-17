const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}));

app.use(cookieParser());

const routes = [
    require('./routes/userRoutes'),
    require('./routes/companyRoutes'),
    require('./routes/productRoutes'),
];

routes.forEach(route => app.use(route));

module.exports = app;