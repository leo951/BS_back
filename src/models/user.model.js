const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  lastname: {
    type: String,
    lowercase: true,
  },
  firstname: {
    type: String,
    lowercase: true,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlenght: 4,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
  },
});
module.exports = mongoose.model("User", userSchema);
