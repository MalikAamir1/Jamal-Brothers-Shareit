import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  NewUser: null,
  status: '',
  error: '',
};

const NewUserCheckReducer = createSlice({
  name: 'NewUserCheckReducer',
  initialState,
  reducers: {
    getNewUserFromAsyncStorage: (state, action) => {
      state.NewUser = action.payload;
    },
    removeDeviceInfoFromAsyncStorage: (state, action) => {
      state.NewUser = null;
    },
  },
});

export default NewUserCheckReducer.reducer;

export const {getNewUserFromAsyncStorage, removeDeviceInfoFromAsyncStorage} =
  NewUserCheckReducer.actions;
