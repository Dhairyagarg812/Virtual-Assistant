const uploadOnCloudinary=require("../config/cloudinary")
const main=require("../gemini");
const moment=require("moment")
const user=require("../models/userModel")
const getCurrentUser=async(req,res)=>{
    try{
        const userId=req.userId;
    const User=await user.findById(userId).select("-password");
    if(!User){
        return res.status(401).json({message:"User not found"});

    }
    return res.status(200).json(User);
    }  
    catch(err){
        return res.status(400).json({message:"some error occured"})
    }
}

const updateAssistant=async(req,res)=>{
    try{
        const{assistantName,imageUrl}=req.body;
        let assistantImage;
        if(req.file){
             assistantImage=await uploadOnCloudinary(req.file.path);
        }
        else{
            assistantImage=imageUrl;
        }
        const User=await user.findByIdAndUpdate(req.userId,
            {assistantName,assistantImage},{new:true}).select("-password");
            return res.status(200).json(User)
    }
    catch(err){
        console.log("Update Assistant Error:", err);
        return res.status(400).json({message:"Error in image fetching"});
    }
}
const askToAssistant = async (req, res) => {
  console.log("Raw Request Body:", req.body);  
  try {
      // ADD THIS
  
      const { command } = req.body;
  
     
      const User = await user.findById(req.userId);
      User.history.push(command);
      User.save();
      const result = await main(
        command,
        User.name,
        User.assistantName
      );
  
      return res.status(200).json({
        response: result,
      });
    } catch (err) {
      if (err.status === 503) {
        return res.status(503).json({
          response: "Gemini is busy right now. Please try again after some time.",
        });
      }
        console.log("ASK ERROR:", err);
        console.log("ASK ERROR MESSAGE:", err.message);
        
        return res.status(500).json({
          response: err.message,
        });
      }
  };

module.exports={getCurrentUser,updateAssistant,askToAssistant}