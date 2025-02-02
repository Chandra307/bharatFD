const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

const faqrouter = require("./routes/faq");
const faq = require("./models/faq");

app.use(express.json());
app.use("/", faqrouter);

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    console.log("Connection to DB succesful.");
    app.listen(process.env.PORT, () => console.log("Server is up!!"));
})
.catch(err => console.error(err, "Ohhh, no!"));