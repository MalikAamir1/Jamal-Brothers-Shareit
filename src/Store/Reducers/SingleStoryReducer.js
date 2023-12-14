import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  SingleStoryData: {},
  status: '',
  error: '',
};

const SingleStoryReducer = createSlice({
  initialState,
  name: 'SingleStoryReducer',
  reducers: {
    SingleStoryUpdateLocally: (state, action) => {
      state.SingleStoryData = action.payload;
    },
    SingleStoryRemoveLocally: (state, action) => {
      state.SingleStoryData = action.payload;
    },
  },
});

export default SingleStoryReducer.reducer;
export const {SingleStoryUpdateLocally, SingleStoryRemoveLocally} =
  SingleStoryReducer.actions;
