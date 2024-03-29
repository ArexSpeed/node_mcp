const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller
  if(!username || !password) {
    throw new BadRequestError('Please provide email and password');
  } 

  //just for demo normal id provide by DB
  const id = new Date().getDate()

  // for production make more complex string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

  console.log(username, password);
  res.status(200).json({ msg: 'user created', token });
}

const dashboard = async (req, res) => {
  console.log(req.user);

  const luckyNumber = Math.floor(Math.random()*100);

  res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your auth data, your number: ${luckyNumber}` })

}

module.exports = {
  login,
  dashboard
}