import { useAppSelector } from '../../../app/hooks.ts';
import { selectItems } from '../itemsSlice.ts';
import {Grid} from '@mui/material';
import ItemPresent from './ItemPresent.tsx';
import Categories from '../../categories/Categories.tsx';


const Items = () => {

  const items = useAppSelector(selectItems);

  return (
    <Grid container direction="column" spacing={2}>
      <Categories/>
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