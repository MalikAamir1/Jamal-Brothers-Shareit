// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import {postRequest} from '../../utils/fetch';
// import {BASE_URL} from '../../utils/api';

// const initialState = {
//   coin: [],
//   status: '',
//   error: '',
// };

// // GET REQUESTS
// export const GetCoin = createAsyncThunk('GetCoin', async writer_id => {
//   const result = await postRequest(`${BASE_URL}/getcoins.php`, writer_id);
//   return result;
// });

// const CoinReducer = createSlice({
//   name: 'CoinReducer',
//   initialState,
//   reducers: {
//     CoinDataFromAsyncStorage: (state, action) => {
//       state.coin = action.payload;
//     },
//     removeCoinDataFromAsyncStorage: (state, action) => {
//       state.coin = {};
//     },
//   },

//   extraReducers: {
//     [GetCoin.pending]: (state, action) => {
//       state.status = 'pending';
//     },
//     [GetCoin.rejected]: (state, action) => {
//       state.status = 'Error';
//       state.error = action.payload;
//     },
//     [GetCoin.fulfilled]: (state, action) => {
//       state.coin = action.payload;
//       state.status = 'Ok';
//       state.error = 'None';
//     },
//   },
// });
// export default CoinReducer.reducer;
// export const {CoinDataFromAsyncStorage, removeCoinDataFromAsyncStorage} =
//   CoinReducer.actions;
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postRequest} from '../../utils/fetch';
import {BASE_URL} from '../../utils/api';

const initialState = {
  coin: [],
  status: '',
  error: '',
};

export const GetCoin = createAsyncThunk('GetCoin', async writer_id => {
  const result = await postRequest(`${BASE_URL}/getcoins.php`, writer_id);
  return result;
});

const CoinReducer = createSlice({
  name: 'CoinReducer',
  initialState,
  reducers: {
    CoinDataFromAsyncStorage: (state, action) => {
      state.coin = action.payload;
    },
    removeCoinDataFromAsyncStorage: (state, action) => {
      state.coin = {};
    },
  },
  // Converting extraReducers to builder callback
  extraReducers(builder) {
    builder
      .addCase(GetCoin.pending, state => {
        state.status = 'pending';
      })
      .addCase(GetCoin.rejected, (state, action) => {
        state.status = 'Error';
        state.error = action.payload;
      })
      .addCase(GetCoin.fulfilled, (state, action) => {
        state.coin = action.payload;
        state.status = 'Ok';
        state.error = 'None';
      });
  },
});

export default CoinReducer.reducer;
export const {CoinDataFromAsyncStorage, removeCoinDataFromAsyncStorage} =
  CoinReducer.actions;
