const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
// {=====================================SIGNUP_ADMIN=================================}
const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingAdmin) {
    return res.status(400).json({ message: "Admin Already exits" });
  }
  let admin;
  const hashedPassword = bcrypt.hashSync(password);
  try {
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (error) {
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ meesage: "Unable to store admin" });
  }
  return res.status(201).json({ admin });
};
// {====================================LOGIN_ADMIN=================================}
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin Not Found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ meesage: "Inccorect Password" });
  }
  const token=jwt.sign({id:existingAdmin._id},process.env.JWT_SECRET,{expiresIn:"7d",})
  return res.status(200).json({ message: "Authentication is Completed" ,token,id:existingAdmin._id});
};


module.exports = { addAdmin ,adminLogin};
