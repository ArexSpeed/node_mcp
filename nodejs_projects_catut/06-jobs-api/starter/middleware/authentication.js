const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authenticated invalid!');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name }

    //Instead above req.user in object
    //const user = User.findById(payload.id).select('-password');
    //req.user = user

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authenticated invalid!')
  }
}

module.exports = auth;