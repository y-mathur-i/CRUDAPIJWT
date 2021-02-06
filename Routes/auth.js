const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  validateUserRegister,
  validateUserLogin,
} = require("../utils/validation");
const User = require("../models/user");

// POST --register user
router.post("/register", async (req, res) => {
  const { error } = validateUserRegister(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).send("Email already exists");
    }
  } catch (error) {
    return res.status(400).send(error);
  }

  // preparing passowrd to store it
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const savedUser = await user.save();
    return res.status(200).send(savedUser);
  } catch (err) {
    // console.error(err);
    return res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateUserLogin(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid credentials.");
  }
  const jwtToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  return res.header("auth-token", jwtToken).send(jwtToken);
});

module.exports = router;
