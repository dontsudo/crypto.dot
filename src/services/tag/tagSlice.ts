import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export type TagState = {
  pinned: string[];
};

const initialState: TagState = {
  pinned: [],
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      state.pinned.push(action.payload.toUpperCase());
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.pinned = state.pinned.filter((tag) => tag !== action.payload);
    },
    clearTags: () => initialState,
  },
});

export const { addTag, removeTag, clearTags } = tagSlice.actions;

export const selectTag = (state: RootState) => state.tag;

export default tagSlice.reducer;
