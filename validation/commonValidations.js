import mongoose from "mongoose";
import { body } from "express-validator";

import User from "../models/userModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";

const validateId = async (model, id, userId, isAdmin) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new BadRequestError(`Invalid ${model} id`);
  }

  const entity = await model.findById(id);
  if (!entity) {
    throw new NotFoundError(`${model} not found`);
  }

  const isOwner = userId === entity.createdBy.toString();
  if (!isAdmin && !isOwner) {
    throw new UnauthorizedError("Unauthorized");
  }
};

const isNonEmptyString = (field) =>
  body(field).isString().notEmpty().withMessage(`${field} is required`);

const validateEmail = () =>
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    });

const validatePassword = () =>
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long");

const validateOptionalField = (field, values) =>
  body(field).optional().isIn(values).withMessage(`Invalid ${field}`);

export {
  validateId,
  isNonEmptyString,
  validateEmail,
  validatePassword,
  validateOptionalField,
};
