const { validationResult } = require("express-validator");

function expressValidatorMapper(req, res, next) {
  let result = validationResult(req);
  let messages = {};
  if (result?.errors?.length > 0) {
    result?.errors?.forEach((error) => {
        messages[error.path] = error.msg
    })
    return res.status(400).json({
      status: res.statusCode,
      success: false,
      messages,
    });
  }
  next();
}

module.exports = {
  expressValidatorMapper,
};
