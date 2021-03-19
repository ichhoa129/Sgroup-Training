require('dotenv').config();
const knex = require('../knex/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {getOneByEmail} = require('../services/authorService');

const register = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    await knex('authors').insert({
      email: req.body.email,
      password,
      role_id: 2
    });
    return res.json({
      status: "success",
      statusCode: 200,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      statusCode: 500,
      message: "Failed to register user"
    });
  }
};

const login = async (req, res, next) => {
  try {
    const user = await getOneByEmail(req.body.email);
    if(!user) {
      return res.json({
        status: "fail",
        statusCode: 400,
        message: "User or password is incorrect",
      });
    }
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(!result) {
        return res.json({
          status: "fail",
          statusCode: 400,
          message: "User or password is incorrect",
        });
      }
      // Password is correct
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRE, 10) });
      return res.json({
        token
      });
    });
  } catch (error) {
    
  }
};

module.exports = {
  register,
  login,
}