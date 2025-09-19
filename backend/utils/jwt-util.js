const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const signToken = (email, id) => {
  try {
    token = jwt.sign({ email: email, id: id }, secret, { expiresIn: "7d" });
    return token;
  } catch (error) {
    throw error;
  }
};

module.exports = signToken;
