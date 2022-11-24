const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const protect = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.decoded = decoded;
      next();
    } else {
      next(createError(400, "server need token"));
    }
  } catch (error) {
    console.log(error.name);

    if (error && error.name === "JsonWebTokenError") {
      next(createError(400, "token invalid"));
    } else if (error && error.name === "TokenExpiredError") {
      next(createError(400, "token expaired"));
    } else {
      next(createError(400, "token not active"));
    }
  }
};

module.exports = protect;
