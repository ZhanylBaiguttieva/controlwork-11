import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectItems } from '../itemsSlice.ts';
import { useEffect } from 'react';
import { fetchItems } from '../itemsThunk.ts';
import {Grid, Typography } from '@mui/material';
import ItemPresent from './ItemPresent.tsx';


const Items = () => {

  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">All Items</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {items.map(item => (
          <ItemPresent
            key={item._id}
            item={item}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Items;