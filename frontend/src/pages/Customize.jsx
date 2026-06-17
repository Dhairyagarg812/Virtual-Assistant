import React, { useContext, useRef, useState } from 'react'
import { GoPlusCircle } from "react-icons/go";
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/authBg.png"
import image4 from "../assets/image4.png"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.jpeg"
import image7 from "../assets/image7.jpeg"
import { IoMdArrowRoundBack } from "react-icons/io";
import Card from '../components/Card'
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router';
const Customize = () => {
   const {userData, setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage}=useContext(userDataContext)
    const inputImage=useRef();
    const navigate=useNavigate()
    const handleImage=(e)=>{
        const file=e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file))
    }

  return (
    <div className="w-[screen] h-[100vh] bg-linear-to-t flex justify-center items-center flex-col from-[black] to-[#121256]">
        <IoMdArrowRoundBack onClick={()=>navigate("/")} className='cursor-pointer absolute h-[25px] w-[25px] text-white top-[10vh] left-[8vw]' />
        <h1 className='text-3xl text-white mb-[7vh]'>Select Your<span className='text-blue-400'> Virtual Assistant</span></h1>
        <div className=' flex h-[60vh] w-[70vw] justify-center gap-[5vh]  items-center flex-wrap '>
        <Card image={image1}></Card>
        <Card image={image2}></Card>
        <Card image={image3}></Card>
        <Card image={image4}></Card>
        <Card image={image5}></Card>
        <Card image={image6}></Card>
        <Card image={image7}></Card>

        <div  onClick={()=>{inputImage.current.click(); setSelectedImage("input")}} className={`${selectedImage=="input" ?"border-white shadow-blue-950":""} bg-[#131333] border-4 rounded-2xl border-blue-800 transition-all h-[31vh] flex justify-center items-center w-[10vw] duration-300 cursor-pointer hover:shadow-2xl hover:border-4 hover:border-white hover:shadow-blue-950 overflow-hidden rounded`}>
        {!frontendImage&&<GoPlusCircle fontSize={"3vh"} />}
        {frontendImage&&<img className='object-cover h-full' src={frontendImage}/>}
    </div>
    <input type="file" accept='image/*' hidden ref={inputImage} onChange={handleImage}></input>
    
        </div>
        {selectedImage&&<button onClick={()=>navigate('/customize2')} className='text-white p-4 px-6 bg-blue-600 rounded-full mt-[10vh] text-2xl relative'>Next</button>}
    
    </div>
  )
}

export default Customize