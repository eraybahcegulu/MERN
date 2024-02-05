import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUsersService } from '../services/userService';
import { handleFetchUserError } from '../constants/errorConstant/errorUser';

interface UserState {
    data: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
}

export const getUsers = createAsyncThunk('getUsers', async (token: any) => {
    try {
        const response = await getUsersService(token);
        return response.data;
    } catch (error: any) {
        handleFetchUserError(error);
    }
});

const initialState: UserState = {
    data: [],
    status: 'idle',
};

const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
            })

            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })

            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default userSlice.reducer;