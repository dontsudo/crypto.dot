import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

import storage from './storage';
import tickerReducer from '../services/ticker/tickerSlice';
import tagReducer from '../services/tag/tagSlice';

const reducers = combineReducers({
  ticker: tickerReducer,
  tag: tagReducer,
});

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['tag'],
  },
  reducers
);

export const store = configureStore({
  reducer: persistedReducers,
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
