const http = require('http')
const url = require('url')

const server = http.createServer((req,res ) => {
  const requestUrl = url.parse(req.url);
  const path = requestUrl.pathname;

  switch(req.url) {
		case '/':
			res.end('Start')
			break;
		case '/hello':
			res.end('Hello World')
			break;
		default:
			break;
	}
})

server.listen(5000, () => console.log('server is listening on port 5000'))
