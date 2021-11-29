const jwt = require('jsonwebtoken');
const { UnauthenticatedError }= require('../errors');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Authorization: Bearer token set in headers
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  //console.log(req.headers.authorization);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { id, username } = decoded;
    req.user = {
      id, 
      username
    }
    next();
  } catch (error) {
    throw new UnauthenticatedError('No authorized to access this route');
  }

}

module.exports = authMiddleware;