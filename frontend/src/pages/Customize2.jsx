import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { IoMdArrowRoundBack } from "react-icons/io";

const Customize2 = () => {
    const {setUserData, userData,backendImage,selectedImage } = useContext(userDataContext);
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
   const navigate=useNavigate();
    const handleUpdateAssistant=async()=>{
        try{
            let formData=new FormData();
            formData.append("assistantName",assistantName);
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }
            else{
                formData.append("imageUrl",selectedImage);
            }
            const result=await axios.post("https://virtual-assistant-f3fg.onrender.com/api/user/update",formData,{withCredentials:true});
            console.log(result.data);
            setUserData(result.data);
        }
        catch(err){
            console.log(err.response?.data || err);
        }
    }

    return (
        <div className='w-[screen] h-[100vh] bg-linear-to-t flex justify-center items-center flex-col from-[black] to-[#121256]'>
            <IoMdArrowRoundBack onClick={()=>navigate("/customize")} className='cursor-pointer absolute h-[25px] w-[25px] text-white top-[10vh] left-[8vw]' />
            <h1 className='text-3xl text-white mb-[7vh]'>Enter Your<span className='text-blue-400'> Assistant's Name</span></h1>
            <input onChange={(e) => setAssistantName(e.target.value)} value={assistantName} type="text" className=" text-lg w-[40%] mb-[3vh] rounded-4xl border-2 p-4 border-amber-50 text-white" placeholder="eg. Jarvis"></input>
            {assistantName && <button onClick={() =>{   
                handleUpdateAssistant()
                navigate("/")
            }}  className='cursor-pointer text-white -mt-2.5 p-4 px-6 bg-blue-600 rounded-full mt-[10vh] text-2xl relative'>Create Your Assistant</button>
            }
        </div>
    )
}

export default Customize2