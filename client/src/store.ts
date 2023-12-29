import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./redux-toolkit/companySlice";
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    company: companySlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
