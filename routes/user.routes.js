const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// registration
userRouter.post("/register", async (req, res) => {
  const { email, pass, location, age } = req.body;
  try {
    // bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    //   // Store hash in your password DB.
    // });
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ email, pass: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration has been done!" });
    });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// login (authentication)
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        // pass: which we put into body, user.pass: hash password
        if (result) {
          res.status(200).send({
            msg: "Login Successful!",
            token: jwt.sign({ userID: user._id }, "masai"),
          }); // payload, signature/secret-key
        } else {
          res.status(400).send({ msg: "Login Failed! Wrong Credentials!" });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// restricted routes
userRouter.get("/details", (req, res) => {
  // const { token } = req.query;
  const token = req.headers.authorization;
  jwt.verify(token, "masai", (err, decoded) => {
    decoded
      ? res.status(200).send("User Details")
      : res
          .status(400)
          .send({ msg: "login required, cannot access the restricted route" });
  });
});

userRouter.get("/moviedata", (req, res) => {
  // const { token } = req.query;
  const token = req.headers.authorization;
  jwt.verify(token, "masai", (err, decoded) => {
    decoded
      ? res.status(200).send("Movie Data")
      : res.status(400).send({ msg: err.message });
  });
});

module.exports = { userRouter };
