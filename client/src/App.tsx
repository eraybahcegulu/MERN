import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react'
import Login from './pages/Login';
import Home from "./pages/Home";
import Company from "./pages/Company";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/companies" element={<Company />} />
                <Route path="/products" element={<Product />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App