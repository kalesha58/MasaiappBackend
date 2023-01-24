const express=require("express");
const { signUp, loginUser } = require("../controllers/userControllers");
const userRouter=express.Router();

userRouter.post("/signup",signUp)
userRouter.post("/login",loginUser)
module.exports=userRouter