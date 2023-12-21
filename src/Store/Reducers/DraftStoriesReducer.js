// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {postRequest} from '../../utils/fetch';
// import {BASE_URL} from '../../utils/api';

// const initialState = {
//   draftStoriesData: [],
//   status: '',
//   error: '',
// };

// // GET REQUESTS
// export const getDraftStories = createAsyncThunk(
//   'getdraftstories',
//   async body => {
//     const result = await postRequest(`${BASE_URL}/getdraftstories.php`, body);
//     return result;
//   },
// );

// const DraftStoriesReducer = createSlice({
//   name: 'DraftStoriesReducer',
//   initialState,
//   reducers: {
//     setDraftDataFromLocal: (state, action) => {
//       state.draftStoriesData = action.payload;
//     },
//     removeDraftDataFromLocal: (state, action) => {
//       state.draftStoriesData = {};
//     },
//   },

//   extraReducers: {
//     [getDraftStories.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [getDraftStories.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//     [getDraftStories.fulfilled]: (state, action) => {
//       state.draftStoriesData = action.payload;
//       state.status = 'Ok';
//       state.error = 'None';
//     },
//   },
// });
// export default DraftStoriesReducer.reducer;
// export const {setDraftDataFromLocal, removeDraftDataFromLocal} =
//   DraftStoriesReducer.actions;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';

const initialState = {
  draftStoriesData: [],
  status: '',
  error: '',
};

export const getDraftStories = createAsyncThunk(
  'getdraftstories',
  async body => {
    const result = await postRequest(`${BASE_URL}/getdraftstories.php`, body);
    return result;
  },
);

const DraftStoriesReducer = createSlice({
  name: 'DraftStoriesReducer',
  initialState,
  reducers: {
    setDraftDataFromLocal: (state, action) => {
      state.draftStoriesData = action.payload;
    },
    removeDraftDataFromLocal: (state, action) => {
      state.draftStoriesData = {};
    },
  },
  // Converting extraReducers to builder callback
  extraReducers(builder) {
    builder
      .addCase(getDraftStories.pending, state => {
        state.status = 'pending';
      })
      .addCase(getDraftStories.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      })
      .addCase(getDraftStories.fulfilled, (state, action) => {
        state.draftStoriesData = action.payload;
        state.status = 'Ok';
        state.error = 'None';
      });
  },
});

export default DraftStoriesReducer.reducer;
export const {setDraftDataFromLocal, removeDraftDataFromLocal} =
  DraftStoriesReducer.actions;
