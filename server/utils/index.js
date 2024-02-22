const jwt = require("jsonwebtoken");

const jwtSign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const jwtVerify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  jwtSign,
  jwtVerify,
};
