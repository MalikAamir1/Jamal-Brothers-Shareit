import {createSlice} from '@reduxjs/toolkit';
import {useEffect} from 'react';
// import { useEffect, useState } from 'react';

const initialState = {
  isdark: true,
};

export const counterSlice = createSlice({
  name: 'darkMode',
  initialState,

  reducers: {
    isDark: (state, action) => {
      state.isdark = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {isDark} = counterSlice.actions;

export default counterSlice.reducer;
