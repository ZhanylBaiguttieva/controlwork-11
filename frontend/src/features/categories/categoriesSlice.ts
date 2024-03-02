import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../../types';
import { RootState } from '../../app/store.ts';
import { fetchCategories } from './categoriesThunk.ts';

interface CategoriesState {
  items: Category[];
  fetching: boolean;
}

const initialState: CategoriesState = {
  items: [],
  fetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetching = true;
    }).addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetching = false;
      state.items = categories;
    }).addCase(fetchCategories.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const selectCategories = (state: RootState) => state.categories.items;