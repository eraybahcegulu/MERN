import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CompanyState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

const GET_COMPANY_API_URL = `${process.env.REACT_APP_API_URL}/api/company/get-all`;

export const fetchCompanyData = createAsyncThunk('fetchCompanyData', async () => {
    try {
        const response = await axios.get(GET_COMPANY_API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const initialState: CompanyState = {
    data: [],
    status: 'idle',
};

const companySlice = createSlice({
    name: 'company',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyData.pending, (state) => {
                state.status = 'loading';
            }) 

            .addCase(fetchCompanyData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            
            .addCase(fetchCompanyData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companySlice.reducer;