import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategories } from './categoriesSlice.ts';
import { useEffect } from 'react';
import { fetchCategories } from './categoriesThunk.ts';
import { Button, Stack } from '@mui/material';


const Categories = () => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Stack>
      {categories.map(category => (
        <Button key={category._id}>{category.title}</Button>
      ))}
    </Stack>
  );
};

export default Categories;