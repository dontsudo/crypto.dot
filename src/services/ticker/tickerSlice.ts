import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../store';
import tickerAPI from './tickerAPI';
import type { TickerResponse } from './tickerTypes';

export type TickerState = {
  prev: TickerResponse | null;
  current: TickerResponse | null;
  isLoading: boolean;
};

export const fetchTickers = createAsyncThunk(
  'ticker/fetchTickers',
  async (source: 'bithumb' | 'upbit') => {
    const response = await tickerAPI[source].fetchTickerList();
    return response.data;
  }
);

const initialState: TickerState = {
  prev: null,
  current: null,
  isLoading: false,
};

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTickers.fulfilled, (state, action) => {
        state.prev = state.current;
        state.current = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTickers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectTicker = (state: RootState) => state.ticker;

export default tickerSlice.reducer;
