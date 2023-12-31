import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {GET_PRODUCTS_API_URL} from '../constants/apiConstant';

interface ProductState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export const fetchProductData = createAsyncThunk('fetchProductData', async () => {
    try {
        const response = await axios.get(GET_PRODUCTS_API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const initialState: ProductState = {
    data: [],
    status: 'idle',
};

const productSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.status = 'loading';
            }) 

            .addCase(fetchProductData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            
            .addCase(fetchProductData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;