import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const $instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
  Authorization: `Bearer token ...`,
}); 

export const setToken = token => {
  $instance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const clearToken = () => {
  $instance.defaults.headers['Authorization'] = '';
};
/////////////// Register Thunk /////////////
export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (userData, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/signup', userData);
      setToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);
/////////////// Login Thunk /////////////
export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (userData, thunkApi) => {
    try {
      const { data } = await $instance.post('/users/login', userData);
      setToken(data.token);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);

/////////////// Refresh Thunk /////////////
export const refreshUserThunk = createAsyncThunk(
  'auth/refreshUser',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;

    try {
      setToken(token);
      const { data } = await $instance.get('/users/current');
      console.log('data', data);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);

/////////////// Logout Thunk /////////////
export const logoutUserThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {

    try {
      const { data } = await $instance.post('/users/logout');
      clearToken();

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.massage);
    }
  }
);

// axios.defaults.baseURL = 'https://64cbd7e42eafdcdc8519643d.mockapi.io/api';

// export const fetchContact = createAsyncThunk(
//   'phoneBook/fetchContact',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('/contacts');
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const addContact = createAsyncThunk(
//   'phoneBook/addContact',
//   async (newContact, thunkApi) => {
//     try {
//       const response = await axios.post(`/contacts`, newContact);

//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteContact = createAsyncThunk(
//   'phoneBook/deleteContact',
//   async (contactId, thunkApi) => {
//     try {
//       const response = await axios.delete(`/contacts/${contactId}`);
//       return response.data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );
