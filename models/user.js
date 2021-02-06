const { string } = require("joi");
const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
});

module.exports = mongoose.model("User", userSchema);
