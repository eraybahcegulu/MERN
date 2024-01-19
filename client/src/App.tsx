
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Company from './pages/Company';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './helpers/PrivateRoute';
import { EmailConfirmRoute } from './helpers/EmailConfirmRoute';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/api/user/emailConfirm/:emailConfirmToken" element={<EmailConfirmRoute />} />

                <Route path="/home" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />


                <Route path="/companies" element={
                    <PrivateRoute>
                        <Company />
                    </PrivateRoute>
                } />

                <Route path="/products" element={
                    <PrivateRoute>
                        <Product />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
