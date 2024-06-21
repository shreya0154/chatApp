import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './pages/register'
import Login from './pages/login'
import Chat from './pages/chat'
import SetAvatar from './pages/SetAvatar'

// source code
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/forgotPassword" element={<Forgot_password />} /> */}
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>
    </BrowserRouter>

    
  );
}

