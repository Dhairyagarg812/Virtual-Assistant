const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config();
const isAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(400).json({message:"Not valid user"})
        }
        const verifyToken=await jwt.verify(token,process.env.SECRET_KEY);
        req.userId=verifyToken.userId;
        next();
    }
    catch(err){
        return res.status(401).json({message:"Some error occured "})
    }
    
}
module.exports=isAuth;