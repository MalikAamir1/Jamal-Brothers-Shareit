// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {postRequest} from '../../utils/fetch';
// import {BASE_URL} from '../../utils/api';

// const initialState = {
//   coinsHistory: [],
//   status: '',
//   error: '',
// };

// // GET REQUESTS
// export const getCoinsHistory = createAsyncThunk(
//   'getCoinsHistory',
//   async body => {
//     const result = await postRequest(`${BASE_URL}/getcoinshistory.php`, body);
//     return result;
//   },
// );

// const CoinHistoryReducer = createSlice({
//   name: 'CoinHistoryReducer',
//   initialState,
//   reducers: {
//     updateCoinsLocally: (state, action) => {
//       state.coinsHistory = action.payload;
//     },
//     removeCoinsLocally: (state, action) => {
//       state.coinsHistory = [];
//     },
//   },
//   extraReducers: {
//     [getCoinsHistory.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [getCoinsHistory.rejected]: (state, action) => {
//       state.status = 'error';
//       state.error = action.payload;
//     },
//     [getCoinsHistory.fulfilled]: (state, action) => {
//       state.coinsHistory = action.payload;
//       state.status = 'ok';
//       state.error = 'none';
//     },
//   },
// });
// export default CoinHistoryReducer.reducer;
// export const {CoinDataFromAsyncStorage, removeCoinDataFromAsyncStorage} =
//   CoinHistoryReducer.actions;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';

const initialState = {
  coinsHistory: [],
  status: '',
  error: '',
};

export const getCoinsHistory = createAsyncThunk(
  'getCoinsHistory',
  async body => {
    const result = await postRequest(`${BASE_URL}/getcoinshistory.php`, body);
    return result;
  },
);

const CoinHistoryReducer = createSlice({
  name: 'CoinHistoryReducer',
  initialState,
  reducers: {
    updateCoinsLocally: (state, action) => {
      state.coinsHistory = action.payload;
    },
    removeCoinsLocally: (state, action) => {
      state.coinsHistory = [];
    },
  },
  // Converting extraReducers to builder callback
  extraReducers(builder) {
    builder
      .addCase(getCoinsHistory.pending, state => {
        state.status = 'pending';
      })
      .addCase(getCoinsHistory.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(getCoinsHistory.fulfilled, (state, action) => {
        state.coinsHistory = action.payload;
        state.status = 'ok';
        state.error = 'none';
      });
  },
});

export default CoinHistoryReducer.reducer;
export const {CoinDataFromAsyncStorage, removeCoinDataFromAsyncStorage} =
  CoinHistoryReducer.actions;
