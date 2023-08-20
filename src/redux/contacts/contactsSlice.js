import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  requestContactsThunk,
} from './contactsOperations';

const handlePending = state => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder =>
    builder

      ////////////Fetch///////////

      .addCase(requestContactsThunk.pending, state => {
        handlePending(state);
      })

      .addCase(requestContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })

      .addCase(requestContactsThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })

      ////////Add////////////////

      .addCase(addContactThunk.pending, state => {
        handlePending(state);
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.push(action.payload);
      })

      .addCase(addContactThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })

      //////////Delete/////////
      .addCase(deleteContactThunk.pending, state => {
        handlePending(state);
      })

      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
        // state.contacts.items.splice(index, 1);
      })

      .addCase(deleteContactThunk.rejected, (state, action) => {
        handleRejected(state, action);
      }),
});

// export const { setFilter } = phoneBookSlice.actions;
export const selectUserContacts = state => state.contacts.contacts;
export const selectContactsIsLosding = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;
////////
export const selectfilter = state => state.contacts.filter;
///////

export const contactsReducer = contactsSlice.reducer;
