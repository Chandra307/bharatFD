const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const getRedisClient = require('./util/redis');

const app = express();

const faqrouter = require("./routes/faq");
const faq = require("./models/faq");

app.use(express.json());
app.use("/", faqrouter);

  const startApp = async () => {
    try {
      // Ensure Redis is connected before starting the app
      await getRedisClient();
      console.log('Redis connected.');
 
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
      console.log("Connected to DB.");

      // Starting Express app after Redis and DB are connected
      app.listen(process.env.PORT, () => console.log('Server is up!'));
    }
    catch (err) {
      console.error('Error during setting things up:', err);
    }
  };
  
  startApp();