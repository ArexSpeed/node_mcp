// Primary file for API

// Dependencies
const http = require('http')

// The server respond to all request with a string
const server = http.createServer((req,res) =>{
  res.end('Hello World\n')
})

//Start the server, and have it listen on port 5000
server.listen(5000, () => {
  console.log('Server is listening on Port 5000 now')
})