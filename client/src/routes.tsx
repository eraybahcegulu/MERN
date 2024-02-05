import React from 'react';
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

const PrivateRouter = (Page: any) => (
    <PrivateRoute>
        <Page />
    </PrivateRoute>
);

export const routes = [
    {
        path: '*',
        element: <NotFound />
    },

    {
        path: '/',
        element: <Login />
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/api/user/emailConfirm/:emailConfirmToken',
        element: <EmailConfirmRoute />
    },

    {
        path: '/api/user/changeEmailConfirm/:changeEmailConfirmToken',
        element: <ChangeEmailConfirmRoute />
    },

    {
        path: '/api/auth/google/:googleUserToken',
        element: <GoogleAuthRoute />
    },

    {
        path: '/home',
        element: PrivateRouter(Home)
    },

    {
        path: '/companies',
        element: PrivateRouter(Company)
    },

    {
        path: '/products',
        element: PrivateRouter(Product)
    },

    {
        path: '/users',
        element: PrivateRouter(User)
    },
];
