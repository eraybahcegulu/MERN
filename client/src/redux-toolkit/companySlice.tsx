import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { failedServer } from '../constants/notifyConstant/notifyCompany';

import { getCompanies} from '../services/companyService'

interface CompanyState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export const fetchCompanyData = createAsyncThunk('fetchCompanyData', async (token: any) => {
    try {
        const response = await getCompanies(token);
        return response.data;
    } catch (error: any) {
        failedServer(error.message)
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