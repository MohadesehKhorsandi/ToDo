const { validationResult } = require("express-validator");
const { hashString, generateToken } = require("../../modules/functions");
const { UserModel } = require("../../models/user");
const bcrypt = require("bcrypt");

class AuthContorller {
  async register(req, res, next) {
    try {
      const { username, password, firstName, lastName } = req.body;
      const hash_password = hashString(password);
      let user = null;
      user = await UserModel.create({
        first_name: firstName,
        last_name: lastName,
        username,
        password: hash_password,
      }).catch((error) => {
        if (error?.code == 11000) {
          throw { status: 400, messages: { error: "Dupplicate username!" } };
        }
      });
      return res.status(200).json({
        status: res.statusCode,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const hash_password = hashString(password);
      const user = await UserModel.findOne({ username });
      if (!user)
        throw {
          status: 401,
          messages: { error: "Username or password is wrong." },
        };

      const compareResult = bcrypt.compareSync(password, user?.password);
      if (!compareResult)
        throw {
          status: 401,
          messages: { error: "Username or password is wrong." },
        };

      return res.status(200).json({
        status: res.statusCode,
        success: true,
        token: generateToken(username),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthContorller: new AuthContorller(),
};
