import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  SingleLeagueData: {},
  status: '',
  error: '',
};

const SingleLeagueReducer = createSlice({
  initialState,
  name: 'SingleLeagueReducer',
  reducers: {
    SingleLeagueUpdateLocally: (state, action) => {
      state.SingleLeagueData = action.payload;
      console.log('state.SingleLeagueData', state.SingleLeagueData);
    },
    SingleLeagueRemoveLocally: (state, action) => {
      // state.SingleLeagueData = action.payload;
      state.SingleLeagueData = {};
    },
  },
});

export default SingleLeagueReducer.reducer;
export const {SingleLeagueUpdateLocally, SingleLeagueRemoveLocally} =
  SingleLeagueReducer.actions;
