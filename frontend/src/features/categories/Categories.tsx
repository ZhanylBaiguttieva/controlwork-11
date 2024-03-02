import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategories } from './categoriesSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchCategories } from './categoriesThunk.ts';
import { Stack } from '@mui/material';
import { fetchItems } from '../items/itemsThunk.ts';
import { selectItemsLoading } from '../items/itemsSlice.ts';
import { LoadingButton } from '@mui/lab';

const Categories = () => {
  const fetchLoading = useAppSelector(selectItemsLoading);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const fetchFilteredItems = useCallback((id: string) => {
    dispatch(fetchItems(id));
  },[]);


  return (
    <Stack>
      {categories.map(category => (
        <LoadingButton
          key={category._id}
          onClick={() => (fetchFilteredItems(category._id))}
          loading={fetchLoading}
          loadingIndicator="Loading"
        >
          {category.title}
        </LoadingButton>
      ))}
    </Stack>
  );
};

export default Categories;