import { configureStore } from '@reduxjs/toolkit';
import tickerReducer from './ticker/tickerSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
