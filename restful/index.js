// Primary file for API

// Dependencies
const http = require('http')
const https = require('https')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('./config')
const fs = require('fs')
const test = require('./testing')
const handlers = require('./lib/handlers')


// test('create','test', 'newFile', {'foo': 'bar'}, (err) => {
//      console.log('this was the error',err)})
test('read','test', 'newFile', (err, data) => {
      console.log('this was the error',err, 'with data: ', data)})


// The server respond to all request with a string
const httpServer = http.createServer((req,res) =>{
  unifiedServer(req,res)
})
//Start the server, and set port from config
httpServer.listen(config.httpPort, () => {
  console.log(`Server is listening on Port ${config.httpPort} in ${config.envName} mode`)
})

// Instantiate the HTTPS server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions,(req,res) =>{
  unifiedServer(req,res)
})
//Start the HTTPS server
httpsServer.listen(config.httpsPort, () => {
  console.log(`Server is listening on HTTPS Port ${config.httpsPort} in ${config.envName} mode`)
})


// All the server logic for both http and https server
const unifiedServer = (req,res) => {
    //Get the URL and parse it
    const parsedUrl = url.parse(req.url,true)
    //Get the path
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  
    // Get the query string as an object
    const queryStringObject = parsedUrl.query
  
    // get the HTTP Method
    const method = req.method.toLowerCase();
  
    //Get the headers as an object
    const headers = req.headers;
  
    //Get the payload
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    // req.on -> request onEvent
    req.on('data', (data) => {
      buffer += decoder.write(data)
    })
    req.on('end', () => {
      buffer += decoder.end();
  
        //Choose the handler this request should go to. If one is not found use to notFound handler
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound
  
        //Construct the data object to send to the handler
        const data = {
          'trimmedPath': trimmedPath,
          'queryStringObject': queryStringObject,
          'method': method,
          'headers': headers,
          'payload': buffer
        }
        //route the request to the handler specified in the router
        chosenHandler(data, (statusCode, payload) => {
          //Use the status code called back by the handler or default to 200
          statusCode = typeof(statusCode) == 'number' ? statusCode : 200
          //Use the payload by the handler or default to empty object
          payload = typeof(payload) == 'object' ? payload : {}
          //convert the payload to a string
          const payloadString = JSON.stringify(payload)
          //Return the response
          res.setHeader('Content-Type', 'application/json')
          res.writeHead(statusCode)
          res.end(payloadString)
  
          // Log the request path 
          console.log(`Returning this response`, statusCode, payloadString)
        })
  
  
    })
}


//Define a request router
const router = {
  'ping': handlers.ping,
  'users': handlers.users
}