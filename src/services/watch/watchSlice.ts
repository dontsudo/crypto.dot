import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export type WatchState = {
  tickers: string[];
};

const initialState: WatchState = {
  tickers: [],
};

export const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    addToWatchList: (state, action: PayloadAction<string>) => {
      state.tickers.push(action.payload.toUpperCase());
    },
    removeFromWatchList: (state, action: PayloadAction<string>) => {
      state.tickers = state.tickers.filter((tag) => tag !== action.payload);
    },
    ClearAllWatchList: () => initialState,
  },
});

export const { addToWatchList, removeFromWatchList, ClearAllWatchList } = watchSlice.actions;

export const selectTag = (state: RootState) => state.tag;

export default watchSlice.reducer;
