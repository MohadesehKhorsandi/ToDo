const { AuthContorller } = require("../http/controllers/auth.controller");
const { registerValidator } = require("../http/validations/auth");
const { loginValidator } = require("../http/validations/auth");
const { expressValidatorMapper } = require("../http/middlewares/checkErrors");

const router = require("express").Router();

router.post(
  "/register",
  registerValidator(),
  expressValidatorMapper,
  AuthContorller.register
);
router.post(
  "/login",
  loginValidator(),
  expressValidatorMapper,
  AuthContorller.login
);

module.exports = {
  authRoutes: router,
};
