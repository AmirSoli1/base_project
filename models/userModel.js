import mongoose from "mongoose";

import { ROLES } from "../utils/constants.js";

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.USER,
  },
});

export default mongoose.model("User", UserSchema);
