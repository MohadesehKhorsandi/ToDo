const { UserModel } = require("../../models/user");
const { verifyToken } = require("../../modules/functions");

async function checkAuthorization(req, res, next) {
  try {
    const unauthorizedErr = {
      status: 401,
      messages: { error: "user is unauthorized." },
    };
    const authorization = req?.headers?.authorization;
    if (!authorization) throw unauthorizedErr;
    const token = authorization.split(" ")?.[1];
    if (!token) throw unauthorizedErr;
    const username = verifyToken(token);
    const user = UserModel.findOne({ username }, { password: 0 });
    if (!user) throw unauthorizedErr;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkAuthorization,
};
