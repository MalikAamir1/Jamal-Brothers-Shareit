// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// // import {BASE_URL} from '../../../utils/api';
// import {
//   getDataByBody,
//   getDataByBodyParams,
//   getRequest,
//   postRequest,
//   putRequest,
// } from '../../utils/fetch';
// import {BASE_URL} from '../../utils/api';

// const initialState = {
//   Leagues: [],
//   status: '',
//   error: '',
// };

// // GET REQUESTS
// export const GetLeagues = createAsyncThunk('GetLeagues', async () => {
//   const result = await postRequest(`${BASE_URL}/getleagues.php`);
//   return result;
// });

// const LeaguesReducer = createSlice({
//   name: 'leagues',
//   initialState,
//   reducers: {
//     leagueDataFromAsyncStorage: (state, action) => {
//       state.userData = action.payload;
//     },
//     removeleagueDataFromAsyncStorage: (state, action) => {
//       state.userData = {};
//     },
//   },
//   extraReducers: {
//     [GetLeagues.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [GetLeagues.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//     [GetLeagues.fulfilled]: (state, action) => {
//       state.Leagues = action.payload;
//       state.status = 'ok';
//       state.error = 'None';
//     },
//   },
// });
// export default LeaguesReducer.reducer;
// export const {leagueDataFromAsyncStorage, removeleagueDataFromAsyncStorage} =
//   LeaguesReducer.actions;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  getDataByBody,
  getDataByBodyParams,
  getRequest,
  postRequest,
  putRequest,
} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';

const initialState = {
  Leagues: [],
  status: '',
  error: '',
};

export const GetLeagues = createAsyncThunk('GetLeagues', async () => {
  const result = await postRequest(`${BASE_URL}/getleagues.php`);
  return result;
});

const LeaguesReducer = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    leagueDataFromAsyncStorage: (state, action) => {
      state.userData = action.payload;
    },
    removeleagueDataFromAsyncStorage: (state, action) => {
      state.userData = {};
    },
  },
  // Converting extraReducers to builder callback
  extraReducers(builder) {
    builder
      .addCase(GetLeagues.pending, state => {
        state.status = 'pending';
      })
      .addCase(GetLeagues.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      })
      .addCase(GetLeagues.fulfilled, (state, action) => {
        state.Leagues = action.payload;
        state.status = 'ok';
        state.error = 'None';
      });
  },
});

export default LeaguesReducer.reducer;
export const {leagueDataFromAsyncStorage, removeleagueDataFromAsyncStorage} =
  LeaguesReducer.actions;
