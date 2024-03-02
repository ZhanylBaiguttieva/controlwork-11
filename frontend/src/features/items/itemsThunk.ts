import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { Item, ItemMutation } from '../../../types';
import { RootState } from '../../app/store.ts';

export const fetchItems = createAsyncThunk<Item []>(
  'items/fetch',
  async() => {
    const response = await axiosApi.get('/items');
    return response.data;
  }
);

export const createItem = createAsyncThunk<null, ItemMutation,{state: RootState}>(
  'items/create',
  async (itemtMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();

    const keys = Object.keys(itemtMutation) as (keyof ItemMutation)[];
    keys.forEach(key => {
      const value = itemtMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/items', formData,{headers: {'Authorization': 'Bearer ' + token}});
  }
);