import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import App from "./App";
import UserContext from './context/UserContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserContext>
    <Toaster position="top-center" />
    <App/>
    </UserContext>

  </BrowserRouter>
)
