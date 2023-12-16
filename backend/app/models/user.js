const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("user", UserSchema);
module.exports = {
  UserModel,
};
