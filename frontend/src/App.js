import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteDetails from "./pages/NoteDetails"; // en üstte
import Navbar from "./components/Navbar";  // Navbar bileşeni
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NoteAdd from "./pages/NoteAdd";
import NoteEdit from "./pages/NoteEdit";
import Archive from "./pages/Archive";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import React from 'react';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notes/add" element={<NoteAdd />} />
        <Route path="/notes/edit/:id" element={<NoteEdit />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notes/details/:id" element={<NoteDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
