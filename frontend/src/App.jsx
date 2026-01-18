//import { useState, useEffect } from 'react';
import './App.css';
import ContactList from './components/ContactList';
import ContactForm from "./components/ContactForm.jsx";
import ContactDetail from "./components/ContactDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

        // <ContactList/>
        // <ContactForm/>
                //<Route path="/add" element={<ContactForm />} />
/*
        <BrowserRouter>
            <Routes>
                <Route path="/api/contacts/:id" element={<ContactDetail/>} />
            </Routes>
        </BrowserRouter>
  */
  return (
    <>
        <ContactList/>
    </>
  )
}

export default App
