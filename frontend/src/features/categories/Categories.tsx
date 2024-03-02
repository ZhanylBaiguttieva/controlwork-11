import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategories } from './categoriesSlice.ts';
import { useCallback, useEffect } from 'react';
import { fetchCategories } from './categoriesThunk.ts';
import { Button, Stack } from '@mui/material';
import { fetchItems } from '../items/itemsThunk.ts';

const Categories = () => {

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
        <Button
          key={category._id}
          onClick={() => (fetchFilteredItems(category._id))}
        >
          {category.title}
        </Button>
      ))}
    </Stack>
  );
};

export default Categories;