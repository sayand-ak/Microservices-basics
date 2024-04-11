import { createSlice } from "@reduxjs/toolkit";
import { addItemAsync, loginUserAsync, signupUserAsync } from "./userActions";

const getStoredUserInfo = () => {
    try {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        return null;
    }
};

const userInitialState = {
    userInfo: getStoredUserInfo(),
};

const userAuthSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo')
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUserAsync.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loginUserAsync.fulfilled, (state) => {
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(loginUserAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        
        builder
        .addCase(signupUserAsync.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(signupUserAsync.fulfilled, (state) => {
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(signupUserAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder
        .addCase(addItemAsync.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(addItemAsync.fulfilled, (state) => {
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(addItemAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
});


export const { setCredentials, logout } = userAuthSlice.actions;

export { userAuthSlice };
