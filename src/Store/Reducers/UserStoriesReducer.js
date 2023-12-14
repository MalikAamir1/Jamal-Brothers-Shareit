import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  UserStoriesData: {},
  status: '',
  error: '',
};

const UserStoriesReducer = createSlice({
  initialState,
  name: 'UserStoriesReducer',
  reducers: {
    MyUserStoriesUpdateLocally: (state, action) => {
      state.UserStoriesData = action.payload;
      // console.log('state.UserStoriesData', state.UserStoriesData);
    },
    MyUserStoriesRemoveLocally: (state, action) => {
      // state.SingleLeagueData = action.payload;
      state.UserStoriesData = {};
    },
  },
});

export default UserStoriesReducer.reducer;
export const {MyUserStoriesUpdateLocally, MyUserStoriesRemoveLocally} =
  UserStoriesReducer.actions;
