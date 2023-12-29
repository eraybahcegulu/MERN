const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();

const userRoute = require("./routes/user.js");

const PORT = process.env.PORT || 5000;

const db = require('./utils/connectDB.js')
db.connect();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});