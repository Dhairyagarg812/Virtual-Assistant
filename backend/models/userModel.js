const mongoose=require('mongoose')
const {Schema}=require("mongoose");
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    assistantName:{
        type:String,
        
    },
    assistantImage:{
        type:String,
      
    },
    history:[
        {type:String}
    ]
},{timestamps:true})

const user=mongoose.model("User",userSchema);
module.exports=user;