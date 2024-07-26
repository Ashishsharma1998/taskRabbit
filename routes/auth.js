const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      username,
      email,
      password: hash,
    });
    await user.save();
    return res.status(201).json({
      message: "user has been registered",
    });
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email: email });
    if (!user) {
      return res.status(404).json("No user with this email");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json("password is invalid");
    }
    const token = jwt.sign({ email: email }, "sceretKey", {
      algorithm: "RS256",
    });
    return res.status(200).json({
      message: "user has been authenticated!!",
      token: token,
    });
  } catch (error) {
    return res.status(500).json("something went wrong");
  }
});

module.exports = router;
