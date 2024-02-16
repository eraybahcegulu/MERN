const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const session = require("express-session");
const passport = require("passport");
require("./utils/passport");

app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

const routes = [
    require('./routes/userRoutes'),
    require('./routes/companyRoutes'),
    require('./routes/productRoutes'),
];

routes.forEach(route => app.use(route));

module.exports = app;