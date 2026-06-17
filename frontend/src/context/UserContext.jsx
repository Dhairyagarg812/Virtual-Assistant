import { useState,useEffect } from "react";
import React, { createContext } from 'react'
import axios from 'axios';
export const userDataContext = createContext();
const UserContext = ({ children }) => {
    const [frontendImage,setFrontendImage]=useState(null)
    const [backendImage,setBackendImage]=useState(null)
    const [selectedImage,setSelectedImage]=useState(null)
    const [userData, setUserData] = useState(null);
    const handleUserData = async () => {
        try {
            const result =await axios.get("https://virtual-assistant-f3fg.onrender.com/api/user/current",
                { withCredentials: true });
            console.log(result.data);
            setUserData(result.data);
        }
        catch (error) {
            console.log(error);
        }
    }

    const getGeminiResponse = async (prompt) => {
        console.log("Prompt in getGeminiResponse:", prompt);
      
        try {
          const result = await axios.post(
            "https://virtual-assistant-f3fg.onrender.com/api/user/asktoassistant",
            { command: prompt },
            { withCredentials: true }
          );
      
          return result.data;
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        handleUserData();
    }, [])


    const value = { getGeminiResponse,userData, setUserData,frontendImage,setFrontendImage,backendImage,setBackendImage,selectedImage,setSelectedImage}
    return (
        
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        
    )
}

export default UserContext;