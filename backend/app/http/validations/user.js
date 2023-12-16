const { body } = require("express-validator");

function searchValidator() {
  return [body("query").notEmpty().withMessage("query can not be empty.")];
}

module.exports = {
  searchValidator,
};
