const express=require('express');
const app=express();
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
dotenv.config();
const cors=require("cors")
const port=process.env.PORT;
const userRouter=require("./routes/userRouter")
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);



app.listen(port,()=>{
    connectDB()
    console.log("Server working now");
})
