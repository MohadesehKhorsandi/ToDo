const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function hashString(value) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

function verifyToken(token) {
  try {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result) throw { status: 401, message: "user is unauthorized." };
    return result;
  } catch (error) {
    throw { status: 401, message: "user is unauthorized." };
  }
}

module.exports = {
  hashString,
  generateToken,
  verifyToken,
};
