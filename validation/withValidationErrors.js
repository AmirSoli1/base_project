import { validationResult } from "express-validator";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";

const withValidationErrors = (validateValues) => [
  validateValues,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);

      if (errorMessages[0].includes("not found")) {
        throw new NotFoundError(errorMessages);
      }

      if (errorMessages[0].includes("Unauthorized")) {
        throw new UnauthorizedError(errorMessages);
      }

      throw new BadRequestError(errorMessages);
    }
    next();
  },
];

export default withValidationErrors;
