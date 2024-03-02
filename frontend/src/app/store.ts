import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore } from "redux-persist";
import { usersReducer } from '../features/users/usersSlice.ts';
import { itemsReducer } from '../features/items/itemsSlice.ts';
import { categoriesReducer } from '../features/categories/categoriesSlice.ts';


const usersPersistConfig = {
  key:'forum:users',
  storage: storage,
  whiteList: ['user'],
};
const rootReducer = combineReducers({
  categories: categoriesReducer,
  items: itemsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;