// Primary file for API

// Dependencies
const http = require('http')
const url = require('url')
const StringDecoder = require('string_decoder').StringDecoder

// The server respond to all request with a string
const server = http.createServer((req,res) =>{

  //Get the URL and parse it
  const parsedUrl = url.parse(req.url,true)
  //Get the path
  const path = parsedUrl.pathname
  const trimedPath = path.replace(/^\/+|\/+$/g, '')

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

      // Send response
      res.end('Hello World\n')
      // Log the request path -> to start in terminal curl localhost:5000/foo
    console.log(`Req receives with these payload:`, buffer) //to read post body in postman
  })


})

//Start the server, and have it listen on port 5000
server.listen(5000, () => {
  console.log('Server is listening on Port 5000 now')
})