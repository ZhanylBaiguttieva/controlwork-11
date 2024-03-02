import { Item } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createItem, fetchItems } from './itemsThunk.ts';

interface ItemsState {
  items: Item[];
  fetchLoading: boolean;
  createLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  fetchLoading: false,
  createLoading: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, {payload: data}) => {
      state.fetchLoading = false;
      state.items = data;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.fetchLoading = false;
    });

    builder.addCase(createItem.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createItem.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createItem.rejected, (state) => {
      state.createLoading = false;
    });

  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state:RootState) => state.items.items;
export const selectItemsLoading = (state:RootState) => state.items.fetchLoading;
export const selectItemCreating = (state:RootState) => state.items.createLoading;
