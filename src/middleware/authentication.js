const jwt = require('jsonwebtoken');
const knex = require('../knex/connection');

require('dotenv').config();
const checkAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if(!token) {
      return res.json({
        status: "fail",
        statusCode: 400,
        message: "You must be login to see this content"
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await knex('authors')
      .leftJoin("roles", "authors.role_id", "roles.id")
      .leftJoin("roles_permissions", "roles.id", "roles_permissions.role_id")
      .leftJoin("permissions", "permissions.id", "roles_permissions.permission_id")
      .where({ "authors.id": decoded.id })
      .select(["authors.id", "email", "roles.name as role", "permissions.name as permission"]);
    // Save this user into request so you can use it later
    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    if(error.message === "jwt expired") {
      return res.json({
        status: "fail",
        statusCode: 400,
        message: "JWT is expired",
      });
    }
    return res.json({
      status: "fail",
      statusCode: 400,
      message: "JWT format is incorrect",
    });
  }
};

module.exports = {
  checkAuthentication,
}