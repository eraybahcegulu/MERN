import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './pages/Login'
import Home from "./pages/Home";
import Company from "./pages/Company";
import Product from "./pages/Product";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/companies" element={<Company />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App