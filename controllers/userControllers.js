// const user=require("../models/User");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const signUp = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  if (
    !fullname &&
  
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await new User({ fullname, email, password: hashPassword });
    user = user.save();
  } catch (error) {
    return next(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ user });
};
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID " });
  }
  const isPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isPassword) {
    res.status(400).json({ message: "InCorrect Password!" });
  }
  return res.status(200).json({ message: "Login Successfull!..." });
};
module.exports = { signUp, loginUser };
