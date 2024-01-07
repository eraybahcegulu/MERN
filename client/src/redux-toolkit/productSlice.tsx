import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getProducts } from '../services/productService';
import { handleFetchProductError } from '../constants/errorConstant/errorProduct';

interface ProductState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export const fetchProductData = createAsyncThunk('fetchProductData', async (token: any) => {
    try {
        const response = await getProducts(token);
        return response.data;
    } catch (error: any) {
        handleFetchProductError(error);
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