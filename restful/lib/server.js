// Server related tasks

// Dependencies
const http = require('http')
const https = require('https')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder
const config = require('../config')
const fs = require('fs')
const handlers = require('./handlers')
const helpers = require('./helpers')
const path = require('path')
const util = require('util')
const debug = util.debuglog('server')

//Instantiante the server module object
const server = {}

// The server respond to all request with a string
server.httpServer = http.createServer((req,res) =>{
  server.unifiedServer(req,res)
})


// Instantiate the HTTPS server
server.httpsServerOptions = {
  'key': fs.readFileSync(path.join(__dirname,'../https/key.pem')),
  'cert': fs.readFileSync(path.join(__dirname,'../https/cert.pem'))
}
server.httpsServer = https.createServer(server.httpsServerOptions,(req,res) =>{
  unifiedServer(req,res)
})



// All the server logic for both http and https server
server.unifiedServer = (req,res) => {
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
        const chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound
  
        //Construct the data object to send to the handler
        const data = {
          'trimmedPath': trimmedPath,
          'queryStringObject': queryStringObject,
          'method': method,
          'headers': headers,
          'payload': helpers.parseJsonToObject(buffer)
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

          // If the response is 200, print green, otherwise print red
         if(statusCode == 200){
           debug('\x1b[32m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
         } else {
           debug('\x1b[31m%s\x1b[0m',method.toUpperCase()+' /'+trimmedPath+' '+statusCode);
         }
        })
  
  
    })
}


//Define a request router
server.router = {
  'ping': handlers.ping,
  'users': handlers.users,
  'tokens': handlers.tokens,
  'checks': handlers.checks
}

//Init server
server.init = () => {

  server.httpServer.listen(config.httpPort, () => {
    console.log('\x1b[36m%s\x1b[0m','The HTTP server is running on port '+config.httpPort);
  })

  //Start the HTTPS server
server.httpsServer.listen(config.httpsPort, () => {
  console.log('\x1b[35m%s\x1b[0m','The HTTPS server is running on port '+config.httpsPort);
})
}

module.exports = server