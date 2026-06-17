const express=require("express")
const {signIn,signUp,logout}=require("../controllers/auth")
const authRouter=express.Router();
authRouter.post("/signUp",signUp);
authRouter.post("/signIn",signIn);
authRouter.post("/logout",logout);
module.exports=authRouter;