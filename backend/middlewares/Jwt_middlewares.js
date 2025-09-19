const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) {
      let err = new Error("authorization header not found");
      err.status = 403;
      throw err;
    }
    const token = authHeaders.split(" ")[1];
    if (!token) {
      let err = new Error("Token not found");
      err.status = 403;
      throw err;
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
