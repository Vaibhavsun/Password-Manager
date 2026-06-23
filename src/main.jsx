import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import AuthCard from './components/AuthCard.jsx';
import toast, { Toaster } from 'react-hot-toast';
import Home from './Home.jsx';
import AddPassword from './AddPassword.jsx';
import MyPasswords from './Mypasswords.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster/>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />} />
    <Route path="/Auth" element={<AuthCard/>}/> 
    <Route path="/home" element={<Home/>} />
    <Route path="/add-password" element={<AddPassword />} />
    <Route path="/my-passwords" element={<MyPasswords />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
