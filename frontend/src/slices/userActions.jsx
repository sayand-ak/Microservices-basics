import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUserAsync = createAsyncThunk('user/verifyLogin', async ( { email, password } ) => {
    try {
        const response = await axios.post('http://localhost:32000/auth/verifyLogin', { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});

export const signupUserAsync = createAsyncThunk('user/signup', async ( { email, password } ) => {
    try {
        const response = await axios.post('http://localhost:32000/auth/signup', { email, password });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});

export const addItemAsync = createAsyncThunk('product/addProduct', async ( { name, price, uid, pid } ) => {
    try {
        const response = await axios.post('http://localhost:31000/product/addProduct', { name, price, uid, pid });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});

export const listProducts = createAsyncThunk('product/listProducts', async () => {
    try {
        const response = await axios.get('http://localhost:31000/product/listProducts');
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});

export const orderProduct = createAsyncThunk('product/buyProduct', async ({uid, pid}) => {
    try {
        const response = await axios.post('http://localhost:31000/product/buyProduct', { uid, pid });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});
export const addToCart = createAsyncThunk('product/addToCart', async ({uid, pid}) => {
    try {
        const response = await axios.post('http://localhost:31000/product/addToCart', { uid, pid });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data; 
    }
});