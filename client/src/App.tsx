import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './pages/Login.tsx'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App