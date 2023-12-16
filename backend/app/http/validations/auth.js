const { body } = require("express-validator");
const { UserModel } = require("../../models/user");

function registerValidator() {
  return [
    body("username").custom((value, ctx) => {
      if (!value) throw "Username can not be empty.";
      const usernameRegex = /^[a-z][a-z0-9\_]{2,}/gi;
      if (!usernameRegex.test(value)) throw "Username is not valid";
      return true;
    }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password length should be between 6 - 16 chars"),
    body(" "),
  ];
}

function loginValidator() {
  return [
    body("username").custom(async (username) => {
      if (!username) throw "Username can not be empty.";
      const usernameRegex = /^[a-z][a-z0-9\_]{2,}/gi;
      if (!usernameRegex.test(username)) throw "Username is not valid";
    }),
    body("password")
      .isLength({ min: 6, max: 16 })
      .withMessage("Password length should be between 6 - 16 chars"),
  ];
}

module.exports = {
  registerValidator,
  loginValidator,
};
