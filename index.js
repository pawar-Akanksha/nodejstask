const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const registerRouter = require("./routes/register");
const logiRouter = require("./routes/login");
const customerRouter = require("./routes/customer");
const productRouter = require("./routes/product")




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
  app.use(logiRouter);
  app.use(customerRouter);
  app.use(productRouter);




// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Awesome API',
      version: '1.0.0',
      description: 'This is an example API that demonstrates how to use Swagger documentation in an Express.js application.',
    },
    servers: [
      {
        url: `http://localhost:${port}`, 
      },
    ],
    
  },
  // Specify the path to your route files with Swagger annotations
  apis: ['./routes/*.js','./middleware/*.js'], // This assumes your route files are in the 'routes' folder and have a '.js' extension
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI at /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.get('/test', (req,res) => {
  res.json('express server test OK');
})

app.listen(port, () => {
  console.log(`Server is Running on ${port}`);
})
