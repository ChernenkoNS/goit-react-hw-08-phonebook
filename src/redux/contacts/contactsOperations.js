import { createAsyncThunk } from '@reduxjs/toolkit';
import { $instance } from 'redux/auth/authOperations';

export const requestContactsThunk = createAsyncThunk(
  'contact/getAll',
  async (_, thunkApi) => {
    try {
      const { data } = await $instance.get('/contacts');
      console.log('data', data);
      

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messaga);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contact/addContact',
  async (contactData, thunkApi) => {
    try {
      const { data } = await $instance.post('/contacts', contactData);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.messaga);
    }
  }
);


export const deleteContactThunk = createAsyncThunk(
    'contact/deleteContact',
    async (contactId, thunkApi) => {
      try {
        const { data } = await $instance.delete(`/contacts/${contactId}` );
  
        return data;
      } catch (error) {
        return thunkApi.rejectWithValue(error.messaga);
      }
    }
  );
