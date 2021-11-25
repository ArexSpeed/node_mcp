require('dotenv').config();
require('express-async-errors');
//async errors

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

app.use('/api/v1/products', productsRouter);

//product route
app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 5000

const start = async() => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to the port ${port}`))
  } catch (error) {
    console.log(error);
  }
}

start();