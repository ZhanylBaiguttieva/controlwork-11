import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../axiosApi.ts';
import { Item, ItemInfo, ItemMutation } from '../../../types';
import { RootState } from '../../app/store.ts';

export const fetchItems = createAsyncThunk<Item [], string>(
  'items/fetch',
  async(categoryId) => {
    const response = await axiosApi.get('/items?category=' + categoryId);
    return response.data;
  }
);

export const createItem = createAsyncThunk<null,ItemMutation,{state: RootState}>(
  'items/create',
  async (itemMutation, {getState}) => {
    const token = getState().users.user?.token;
    const formData = new FormData();

    const keys = Object.keys(itemMutation) as (keyof ItemMutation)[];
    keys.forEach(key => {
      const value = itemMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    return axiosApi.post('/items', formData,{headers: {'Authorization': 'Bearer ' + token}});
  }
);

export const fetchOneItem = createAsyncThunk<ItemInfo,string>(
  'items/fetchOne',
  async(itemId) => {
    const response = await axiosApi.get('/items/' + itemId);
    return response.data;
  }
);

export const deleteItem = createAsyncThunk<void,string,{state: RootState}>(
  'items/delete',
  async(itemId,{getState}) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/items/' + itemId, {headers: {'Authorization': 'Bearer ' + token}});
  }
)