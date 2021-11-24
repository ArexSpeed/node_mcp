const express = require('express');
const dotenv = require('dotenv');
const app = express();
const tasks = require('./routes/tasks');
const connectBD =  require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

dotenv.config();
// middleware
app.use(express.static('./public'));
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 5000;

const start = async () => {
  try {
    await connectBD(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start();

