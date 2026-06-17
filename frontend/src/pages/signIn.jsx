import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/authBg.png";
import axios from "axios";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useContext } from "react";
import { userDataContext } from "../context/userContext";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
export default function SignIn() {
    
    const {userData, setUserData}=useContext(userDataContext);
    const [showpassword, setshowpassword] = useState(false)
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("http://localhost:8000/api/auth/signin", {  email, password }, { withCredentials: true })
            setUserData(result.data)
            
            toast.success("Signup Successful!");
            navigate("/");
        }
        catch (error) {
            setUserData(null)
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    }
    return (
        <div className="flex -z-30 items-center justify-center w-full h-screen  bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            <div >
                <form onSubmit={handleClick} className="h-[70vh] w-[30vw] shadow-xl shadow-black bg-black/5 backdrop-blur-md flex flex-col items-center justify-center">
                    <h1 className="mb-[5vh] text-white font-bold text-3xl">Login to <span className="text-blue-500">Garg's Virtual Assistant</span></h1>
 

                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" className=" text-lg w-[90%] mb-[3vh] rounded-4xl border-2 p-4 border-amber-50 text-white" placeholder="Enter Your Email"></input>
                    <div className="flex justify-between items-center mb-[3vh] text-lg w-[90%] rounded-4xl border-2 p-4 border-amber-50 text-white">
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type={showpassword ? "text" : "password"} className="w-[24vw] outline-none border-0" placeholder="Enter Your Password"></input>
                        {!showpassword ? <IoMdEye className="cursor-pointer text-2xl mr-2" onClick={() => setshowpassword(!showpassword)} /> : <IoMdEyeOff className="cursor-pointer text-2xl mr-2" onClick={() => setshowpassword(!showpassword)} />}
                    </div>
                    <button className="cursor-pointer flex items-center justify-center  mb-[1vh] w-10vw h-10vh bg-white p-3 text-lg font-bold  mt-2.5 w-[7vw] h-[6vh] rounded-full" type="submit">Sign In</button>
                    <p onClick={() => navigate('/signup')} className="text-white text-lg ">Didn't have an account ?<span className="cursor-pointer ml-[1vh] text-blue-500">Register</span></p>
                </form>
            </div>
        </div>
    )
}