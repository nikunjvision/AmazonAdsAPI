const express = require("express");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DataBase Configration
require("./config/connection");

app.use("/api/amazon", require('./routes/amazon'));

// listening port
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, console.log(`Listerning server at port ${PORT}`));