import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./redux-toolkit/companySlice";
import productSlice from "./redux-toolkit/productSlice";
import userSlice from "./redux-toolkit/userSlice";
import { combineReducers } from 'redux';


export const rootReducer = combineReducers({
    companies: companySlice,
    products: productSlice,
    users: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
