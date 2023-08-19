import { createSlice } from '@reduxjs/toolkit';
import { loginUserThunk, logoutUserThunk, refreshUserThunk, registerUserThunk } from 'redux/auth/authOperations';

const handlePending = state => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    error: null,
    token: null,
    authentificated: false,
  },

  extraReducers: builder =>
    builder

      ///// Register /////

      .addCase(registerUserThunk.pending, state => {
        handlePending(state);
      })

      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(registerUserThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })

      ///// Login /////

      .addCase(loginUserThunk.pending, state => {
        handlePending(state);
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload.user;
        state.token = action.payload.token;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })
      
      ///// Refresh /////

      .addCase(refreshUserThunk.pending, state => {
        handlePending(state);
      })

      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = true;
        state.userData = action.payload;
      })

      .addCase(refreshUserThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })

       ///// Logout /////

       .addCase(logoutUserThunk.pending, state => {
        handlePending(state);
      })

      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authentificated = false;
        state.userData = null;
        state.token = null
      })

      .addCase(logoutUserThunk.rejected, (state, action) => {
        handleRejected(state, action);
      })



  //     ////////////Fetch///////////

  // .addCase(fetchContact.pending, handlePending)

  // .addCase(fetchContact.fulfilled, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = null;
  //   state.contacts.items = action.payload;
  // })

  // .addCase(fetchContact.rejected, handleRejected)

  //     //////////Add////////////////

  // .addCase(addContact.pending, handlePending)

  // .addCase(addContact.fulfilled, (state, action) => {
  //   state.contacts.isLoading = false;
  //   state.contacts.error = null;
  //   state.contacts.items.push(action.payload);
  // })

  // .addCase(addContact.rejected, handleRejected)

  //     //////////Delete/////////

  //       .addCase(deleteContact.pending, handlePending)

  //       .addCase(deleteContact.fulfilled, (state, action) => {
  //         state.contacts.isLoading = false;
  //         state.contacts.error = null;
  //         const index = state.contacts.items.findIndex(
  //           contact => contact.id === action.payload.id
  //         );
  //         state.contacts.items.splice(index, 1);
  //       })

  //       .addCase(deleteContact.rejected, handleRejected),
});

// export const { setFilter } = phoneBookSlice.actions;

export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
export const selectUserUserData = state => state.auth.userData;
export const selectUserToken = state => state.auth.token;
export const selectUserAuthentificated = state => state.auth.authentificated;



export const authReducer = authSlice.reducer;



