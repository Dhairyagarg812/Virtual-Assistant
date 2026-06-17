import React, { useContext, useEffect, useRef, useState } from "react";
import { userDataContext } from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ai from "../assets/ai.gif";
import userImg from "../assets/user.gif"
const Home = () => {
  const { getGeminiResponse, userData, setUserData } =
    useContext(userDataContext);
  const [userText,setUserText]=useState("");
  const [aiText,setAiText]=useState("");
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:8000/api/auth/logout",
      {},
      { withCredentials: true }
    );

    setUserData(null);
    navigate("/signup");
  };
  const speak=(text)=>{
    const utterance=new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (!userData?.assistantName) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    

    recognition.onresult = async (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;
        setUserText(transcript);

     

      if (
        transcript
          .toLowerCase()
          .includes(userData.assistantName.toLowerCase())
      ) {
        
        const res = await getGeminiResponse(transcript);
        const jsonString = res.response
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const data = JSON.parse(jsonString);
        if(data.type=="get_date"){
          console.log(data);
        }
        console.log(data.response)
        handleCommand(data);
      }
    };

    recognition.onend = () => {
      setAiText("")
      recognition.start();
    };
    recognition.onerror=(e)=>{
      setUserText("Error occured") 
      console.warn("Error aa gya h maf kre shayad api limit hit krdi aapne -> "+e)
    }

    

    recognition.start();


    return () => {
      recognition.onend = null;
      recognition.stop();
    };
  }, [userData?.assistantName]);

 

    const handleCommand = (data) => {
      const{userInput,response,type}=data;
      speak(response);
      setAiText(response);
      setUserText("")
  
      if (type === "google_search") {
        const query = encodeURIComponent(userInput);
  
        window.open(
          `https://www.google.com/search?q=${query}`,
          "_blank"
        );
      }
  
      if (type === "calculator_open") {
        window.open(
          "https://www.google.com/search?q=calculator",
          "_blank"
        );
      }
  
      if (type === "instagram_open") {
        window.open(
          "https://www.instagram.com/",
          "_blank"
        );
      }
  
      if (type === "facebook_open") {
        window.open(
          "https://www.facebook.com/",
          "_blank"
        );
      }   
      
      if (type === "facebook-open") {
        window.open("https://www.facebook.com/", "_blank");
      }
      
      if (type === "weather_show") {
        window.open(
          "https://www.google.com/search?q=weather",
          "_blank"
        );
      }
      
      if (type === "youtube_search" || type === "youtube_play") {
        const query = encodeURIComponent(userInput);
      
        window.open(
          `https://www.youtube.com/results?search_query=${query}`,
          "_blank"
        );
      }

      
    }
  

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-linear-to-t from-black to-[#0d0d3c]">
      <div className="flex flex-col items-center">
        <button
          className="flex items-center justify-center absolute top-[4vh] right-6 cursor-pointer bg-white p-3 text-lg font-bold w-[7vw] h-[6vh] rounded-full"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/customize")}
          className="flex items-center justify-center absolute top-[12vh] right-6 cursor-pointer w-[15vw] bg-white p-3 text-lg font-bold h-[6vh] rounded-full"
          type="button"
        >
         Set Assistant
        </button>

        <div className=" border-4 w-[300px] h-[400px] rounded-2xl border-blue-800 overflow-hidden">
          <img
            src={userData?.assistantImage}
            className="w-full h-full object-cover"
            alt="assistant"
          />
        </div>

        <h1 className="text-white text-2xl mt-4">
          I'm {userData?.assistantName}
        </h1>
        <img className="p-2 rounded-4xl h-[20vh] w-[25vh] " src={userText?ai:userImg} alt="hi"/>
        <h1 className="text-white">{userText?userText:aiText?aiText:null}</h1>
      </div>
    </div>
  );
};

export default Home;