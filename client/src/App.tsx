
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Company from './pages/Company';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './helpers/PrivateRoute';
import { EmailConfirmRoute } from './helpers/EmailConfirmRoute';
import { GoogleAuthRoute } from './helpers/GoogleAuthRoute';
import { ChangeEmailConfirmRoute } from './helpers/ChangeEmailConfirmRoute';
import User from './pages/User';


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/api/user/emailConfirm/:emailConfirmToken" element={<EmailConfirmRoute />} />
                <Route path="/api/user/changeEmailConfirm/:changeEmailConfirmToken" element={<ChangeEmailConfirmRoute />} />
                <Route path="/api/auth/google/:googleUserToken" element={<GoogleAuthRoute />} />

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

                <Route path="/users" element={
                    <PrivateRoute>
                        <User />
                    </PrivateRoute>
                } />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
