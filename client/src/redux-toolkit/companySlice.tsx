import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCompaniesService} from '../services/companyService'
import { handleFetchCompanyError } from '../constants/errorConstant/errorCompany';

interface CompanyState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export const getCompanies = createAsyncThunk('getCompanies', async (token: any) => {
    try {
        const response = await getCompaniesService(token);
        return response.data;
    }  catch (error: any) {
        handleFetchCompanyError(error);
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
            .addCase(getCompanies.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(getCompanies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })

            .addCase(getCompanies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default companySlice.reducer;