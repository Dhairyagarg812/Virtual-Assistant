const jwt=require("jsonwebtoken")
const genToken=async(userId)=>{
    try{
        const token=jwt.sign({userId},process.env.SECRET_KEY,{expiresIn:"7d"});
        return token
    }
    catch(err){
        return res.status(201).json({message:`SignUp error ${err.message}`})
    }
}
module.exports=genToken;