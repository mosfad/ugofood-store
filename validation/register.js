const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (!validator.isLength(data.firstName, { min: 1, max: 30 })) {
    errors.name = "First name must be between 1 and 30 characters";
  }
  if (validator.isEmpty(data.firstName)) {
    errors.name = "First name field is required";
  }

  if (!validator.isLength(data.lastName, { min: 1, max: 30 })) {
    errors.name = "Last name must be between 1 and 30 characters";
  }
  if (validator.isEmpty(data.lastName)) {
    errors.name = "Last name field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email entered is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
