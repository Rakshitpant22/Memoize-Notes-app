import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: savedUser ? savedUser : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// Signup reducer
export const userSignup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
    try {
        return await userService.signup(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Login reducer
export const userLogin = createAsyncThunk('auth/login', async (data, thunkAPI) => {
    try {
        return await userService.login(data);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout reducer with localStorage clearing
export const userLogout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
        userService.logout();
        localStorage.removeItem('user');  // Clear user data from localStorage
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Profile picture update reducer
export const userProfilePicture = createAsyncThunk('auth/dp', async (formData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const response = await fetch(`https://api.cloudinary.com/v1_1/${String(import.meta.env.VITE_CLOUD_NAME)}/image/upload`, { method: "post", body: formData });
        const resJSON = await response.json();
        return await userService.updateDP({ url: resJSON.url }, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userSignup.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(userSignup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(userLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = false;
                state.message = '';
                state.user = null;
            })
            .addCase(userProfilePicture.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userProfilePicture.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(userProfilePicture.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            });
    }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;