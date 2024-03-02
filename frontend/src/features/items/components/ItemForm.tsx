import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectItemCreating } from '../itemsSlice.ts';
import { ItemMutation } from '../../../../types';
import { Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import { selectCategories } from '../../categories/categoriesSlice.ts';
import { fetchCategories } from '../../categories/categoriesThunk.ts';

interface Props {
  onSubmit: (mutation: ItemMutation) => void;
}


const ItemForm: React.FC<Props> = ({onSubmit}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const isCreating = useAppSelector(selectItemCreating);
  const [state, setState] = useState<ItemMutation>({
    category: '',
    title: '',
    description: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(state);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <TextField
            select
            id="category" label="Category"
            value={state.category}
            onChange={inputChangeHandler}
            name="category"
            required
          >
            <MenuItem value="" disabled>Please select a category</MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs>
          <TextField
            id="title" label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="description" label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
            required
          />
        </Grid>

        <Grid item xs>
          <TextField
            multiline rows={3}
            id="price" label="Price"
            value={state.price}
            onChange={inputChangeHandler}
            name="price"
            required
          />
        </Grid>

        <Grid item xs>
          <FileInput
            label="Image"
            name="image"
            onChange={fileInputChangeHandler}
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            type="submit"
            color="primary"
            variant="contained"
            loading={isCreating}
            disabled={isCreating}
          >
            Create post
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;