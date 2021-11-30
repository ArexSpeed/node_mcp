const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/index');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT(); //all methods gets from User model
  res.status(StatusCodes.CREATED).json({ user: {name: user.name}, token });
}

const login = async (req, res) => {
  res.send('login user');
}

module.exports = {
  register,
  login
}