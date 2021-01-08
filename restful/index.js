// Primary file for API

// Dependencies
const http = require('http')
const url = require('url')

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

  // Send response
  res.end('Hello World\n')
  // Log the request path -> to start in terminal curl localhost:5000/foo
  console.log(parsedUrl)
  console.log(`Request received on path ${trimedPath} with method: ${method} and with query string param`,queryStringObject )
  console.log(`Req receives with these headers:`, headers)
})

//Start the server, and have it listen on port 5000
server.listen(5000, () => {
  console.log('Server is listening on Port 5000 now')
})