const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    console.log("Connection to DB succesful.");
    app.listen(process.env.port, () => console.log("Server is up!!"));
})
.catch(err => console.error(err, "Ohhh, no!"));