
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller
  if(!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  } 

  //just for demo normal id provide by DB
  const id = new Date().getDate()

  // for production make more complex string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

  console.log(username, password);
  res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;

  //Authorization: Bearer token set in headers
  if(!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 400);
  }

  const token = authHeader.split(' ')[1];
  console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const luckyNumber = Math.floor(Math.random()*100);

    res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Here is your auth data, your number: ${luckyNumber}` })
  } catch (error) {
    throw new CustomAPIError('No authorized to access this route', 401);
  }

}

module.exports = {
  login,
  dashboard
}