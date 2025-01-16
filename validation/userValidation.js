import { body } from "express-validator";

import withValidationErrors from "./withValidationErrors.js";
import {
  isNonEmptyString,
  validateEmail,
  validatePassword,
} from "./commonValidations.js";

const validateRegisterInput = withValidationErrors([
  isNonEmptyString("firstName"),
  isNonEmptyString("lastName"),
  validateEmail(),
  validatePassword(),
]);

const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export { validateRegisterInput, validateLoginInput };
