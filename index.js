const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


const registerRouter = require("./routes/register");




const port = process.env.PORT;
const url = process.env.MONGO_URL; 
// console.log("URL from .env:", url); 






mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database");
  })
  .catch(err => {
    console.log("Error connecting database", err);
  })

  app.use(express.json())
  app.use(registerRouter);


app.get('/test', (req,res) => {
  res.json('express server test OK');
})

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
})