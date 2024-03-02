import { Item, ItemInfo } from '../../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createItem, fetchItems, fetchOneItem } from './itemsThunk.ts';

interface ItemsState {
  items: Item[];
  item: ItemInfo | null;
  fetchLoading: boolean;
  createLoading: boolean;
  fetchOneLoading: boolean;
}

const initialState: ItemsState = {
  items: [],
  item: null,
  fetchLoading: false,
  createLoading: false,
  fetchOneLoading: false,
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

    builder.addCase(fetchOneItem.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchOneItem.fulfilled, (state, {payload: item}) => {
      state.fetchLoading = false;
      state.item = item;
    });
    builder.addCase(fetchOneItem.rejected, (state) => {
      state.fetchLoading = false;
    });
  },
});

export const itemsReducer = itemsSlice.reducer;
export const selectItems = (state:RootState) => state.items.items;
export const selectItem = (state: RootState) => state.items.item;
export const selectItemsLoading = (state:RootState) => state.items.fetchLoading;
export const selectItemCreating = (state:RootState) => state.items.createLoading;
export const selectOneItemLoading = (state:RootState) => state.items.fetchOneLoading;
