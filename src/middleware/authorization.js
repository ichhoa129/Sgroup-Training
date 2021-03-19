const checkAuthorization = (permission) => {
    return function (req, res, next) {
      try {
        const user = req.user;
        for (let i = 0; i < user.length; i++) {
          if(user[i].permission === permission) {
            return next();
          }
        }
        return res.json({
          status: "fail",
          statusCode: 400,
          message: "You are not allowed to use this function"
        });
      } catch (e) {
        return res.json({
          status: "error",
          statusCode: 500,
          message: "An error has occurred"
        });
      }
    }
  }
  module.exports = {
    checkAuthorization,
  }