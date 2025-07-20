// project 13

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/Errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization failed" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Token invalid" });
  }
  req.user = payload;
  return next();
};
