const express = require('express');

const app = express();

// app.use(middleware2);
app.use(middleware1);

function middleware1 (req, res, next) {
  //console.log('I am a middleware 1');
  //const errorObj = new Error('I am an error') -> make errors
  //next(errorObj);
  req.customProperty = 100;
  next(); //to call next function in app.get
}

function middleware2 (req, res, next) {
  //console.log('I am a middleware 2');\
  console.log(`The custom property value is: ${req.customProperty}`);
  req.customProperty = 600;
  next();
}

// function middleware3 (req, res, next) {
//   console.log('I am a middleware 3');
//   next();
// }

function errorHandler (err, req, res, next) {
  res.json({ err: err})
  // if (err) {
  //   res.send('<h1>Thew was an error please try again</h1>')
  // }
};


function standardExpressCallback (requestObject, responseObject, nextMiddleware) {
  console.log('I am the standard Express function');
  responseObject.send(`<h1>The value is: ${requestObject.customProperty}</h1>`);
} 

app.get('/', middleware2, standardExpressCallback);
//app.get('/', middleware1, standardExpressCallback); -> without app.use(middleware1)

app.use(errorHandler); // error should be on the end

app.listen(5000);