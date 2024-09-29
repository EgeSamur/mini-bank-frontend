import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Login işlemi için async thunk
export const login = createAsyncThunk('auth/login', async ({ emailAddress, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5128/api/Auth/Login', { emailAddress, password });
        // Gelen veriler (accessToken, refreshToken vb.)
        const { accessToken, roles, permissions } = response.data;
        return { accessToken, roles, permissions };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('auth/register', async ({ emailAddress, password }, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5128/api/Auth/Register', { emailAddress, password });
        return { response };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        accessToken: null,
        roles: null,
        permissions: null,
        status: 'idle',
        error: null
    },
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.roles = [];
            state.permissions = [];
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.accessToken = action.payload.accessToken.token;
                state.roles = action.payload.roles;
                state.permissions = action.payload.permissions;
                localStorage.setItem("token", action.payload.accessToken.token)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;