// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import {BASE_URL} from '../../utils/api';
// import {postRequest} from '../../utils/fetch';

// const initialState = {
//   BookmarkStories: [],
//   status: '',
//   error: '',
// };

// export const getBookmarkStories = createAsyncThunk(
//   'getBookmarkStories',
//   async body => {
//     let result = await postRequest(`${BASE_URL}/bookmarklist.php`, body);
//     return result;
//   },
// );

// const BookmarkStoriesReducer = createSlice({
//   name: 'BookmarkStoriesReducer',
//   initialState,
//   reducers: {
//     updateBookmarkStories: (state, action) => {},
//     removeBookmarkStories: (state, action) => {},
//   },
//   extraReducers: {
//     [getBookmarkStories.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [getBookmarkStories.fulfilled]: (state, action) => {
//       state.status = 'ok';
//       state.error = 'none';
//       state.BookmarkStories = action.payload;
//     },
//     [getBookmarkStories.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//   },
// });

// export const {updateBookmarkStories, removeBookmarkStories} =
//   BookmarkStoriesReducer.actions;
// export default BookmarkStoriesReducer.reducer;
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BASE_URL} from '../../utils/api';
import {postRequest} from '../../utils/fetch';

const initialState = {
  BookmarkStories: [],
  status: '',
  error: '',
};

export const getBookmarkStories = createAsyncThunk(
  'getBookmarkStories',
  async body => {
    let result = await postRequest(`${BASE_URL}/bookmarklist.php`, body);
    return result;
  },
);

const BookmarkStoriesReducer = createSlice({
  name: 'BookmarkStoriesReducer',
  initialState,
  reducers: {
    updateBookmarkStories: (state, action) => {},
    removeBookmarkStories: (state, action) => {},
  },
  // Converting extraReducers to builder callback
  extraReducers(builder) {
    builder
      .addCase(getBookmarkStories.pending, state => {
        state.status = 'pending';
      })
      .addCase(getBookmarkStories.fulfilled, (state, action) => {
        state.status = 'ok';
        state.error = 'none';
        state.BookmarkStories = action.payload;
      })
      .addCase(getBookmarkStories.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      });
  },
});

export const {updateBookmarkStories, removeBookmarkStories} =
  BookmarkStoriesReducer.actions;
export default BookmarkStoriesReducer.reducer;
