import React from 'react'
import { useContext } from 'react';
import { userDataContext } from '../context/UserContext.jsx';

const Card = ({image}) => {
  const {userData, setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage}=useContext(userDataContext);
  
  return (
    <div onClick={()=>{
      setSelectedImage(image)
      setBackendImage(null)
      setFrontendImage(null)
      }}  className={` ${selectedImage===image?" border-white shadow-blue-950":null} transition-all duration-300 border-4 rounded-2xl border-blue-800 cursor-pointer hover:shadow-2xl hover:border-4 hover:border-white hover:shadow-blue-950 overflow-hidden rounded`}>
      <img  className=" h-[30vh] w-[10vw]  object-cover" src={image}/>
    </div>
  )
}

export default Card;