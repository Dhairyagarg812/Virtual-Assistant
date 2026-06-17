const user=require("../models/userModel")
const validator=require("validator")
const bcrypt=require("bcryptjs");
const genToken = require("../config/token");
const signUp=async(req,res)=>{
    try{
        let {name,email,password}=req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Not valid email"})
        }
        if(await user.findOne({email})){
            return res.status(400).json({message:"Email already exists!!"})
        }
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({message:"Not Strong Password!!"})
        }
        password=await bcrypt.hash(password,10);
        const User=await user.create({name,email,password})
        const token =await genToken(User._id);
        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json(User)
    }
    catch(err){
        return res.status(401).json({message:`SignUp error ${err.message}`})
    }
}



const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Not valid email" });
      }
  
      const User = await user.findOne({ email });
  
      if (!User) {
        return res.status(400).json({ message: "User must SignUp first!!" });
      }
  
      const confirm = await bcrypt.compare(password, User.password);
  
      if (!confirm) {
        return res.status(400).json({ message: "Password Incorrect" });
      }
  
      const token = await genToken(User._id);
  
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      const userWithoutPassword = await user.findById(User._id).select("-password");
  
      return res.status(200).json(userWithoutPassword);
    } catch (err) {
      return res.status(400).json({ message: `Login error ${err.message}` });
    }
  };


const logout=async(req,res)=>{
    try{
      
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
        return res.status(201).json({message:`Cookie Cleared`})
    }
    catch(err){
        return res.status(400).json({message:`Login error ${err.message}`})
    }
}

module.exports={signIn,signUp,logout}