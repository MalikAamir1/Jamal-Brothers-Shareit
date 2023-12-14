// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {BASE_URL} from '../../utils/api';
// import {postRequest} from '../../utils/fetch';

// const initialState = {
//   StoriesList: [],
//   status: '',
//   error: '',
// };

// export const getStoriesList = createAsyncThunk('getStoriesList', async body => {
//   let result = await postRequest(`${BASE_URL}/getstories.php`, body);
//   return result;
// });

// const StoriesReducer = createSlice({
//   name: 'StoriesReducer',
//   initialState,
//   reducers: {
//     updateStoriesList: (state, action) => {},
//     removeStoriesList: (state, action) => {},
//   },
//   extraReducers: {
//     [getStoriesList.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [getStoriesList.fulfilled]: (state, action) => {
//       state.status = 'ok';
//       state.error = 'none';
//       state.StoriesList = action.payload;
//     },
//     [getStoriesList.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//   },
// });

// export const {updateStoriesList, removeStoriesList} = StoriesReducer.actions;
// export default StoriesReducer.reducer;
// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {BASE_URL} from '../../utils/api';
// import {postRequest} from '../../utils/fetch';

// const initialState = {
//   StoriesList: [],
//   status: '',
//   error: '',
// };

// export const getStoriesList = createAsyncThunk('getStoriesList', async body => {
//   let result = await postRequest(`${BASE_URL}/getstories.php`, body);
//   return result;
// });

// const StoriesReducer = createSlice({
//   name: 'StoriesReducer',
//   initialState,
//   reducers: {
//     updateStoriesList: (state, action) => {},
//     removeStoriesList: (state, action) => {},
//   },
//   // Converting extraReducers to builder callback
//   extraReducers(builder) {
//     builder
//       .addCase(getStoriesList.pending, state => {
//         state.status = 'pending';
//       })
//       .addCase(getStoriesList.fulfilled, (state, action) => {
//         state.status = 'ok';
//         state.error = 'none';
//         state.StoriesList = action.payload;
//       })
//       .addCase(getStoriesList.rejected, (state, action) => {
//         state.status = 'Error';
//         state.error = action.payload;
//       });
//   },
// });

// export const {updateStoriesList, removeStoriesList} = StoriesReducer.actions;
// export default StoriesReducer.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  StoriesList: {},
  status: '',
  error: '',
};

const StoriesReducer = createSlice({
  initialState,
  name: 'StoriesReducer',
  reducers: {
    updateStoriesList: (state, action) => {
      state.StoriesList = action.payload;
    },
    removeStoriesList: (state, action) => {
      // state.SingleLeagueData = action.payload;
      state.StoriesList = {};
    },
  },
});

export default StoriesReducer.reducer;
export const {updateStoriesList, SingleLeagueRemoveLocally} =
  StoriesReducer.actions;
