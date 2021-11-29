const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  //Authorization: Bearer token set in headers
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
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
    throw new CustomAPIError('No authorized to access this route', 401);
  }

}

module.exports = authMiddleware;