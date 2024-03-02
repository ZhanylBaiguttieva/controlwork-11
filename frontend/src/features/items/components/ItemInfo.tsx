import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectDeleteLoading, selectItem, selectOneItemLoading } from '../itemsSlice.ts';

import { apiURL } from '../../../../constants.ts';
import { Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { deleteItem, fetchOneItem } from '../itemsThunk.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice.ts';
import { LoadingButton } from '@mui/lab';

const ItemInfo = () => {
  const user = useAppSelector(selectUser);
  const dispatch =useAppDispatch();
  const navigate = useNavigate();
  const item = useAppSelector(selectItem);
  const isOneLoading = useAppSelector(selectOneItemLoading);
  const isDeleting = useAppSelector(selectDeleteLoading);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);

  const cardImage = apiURL + '/' + item?.image;

  const removeItem = async() => {
    await dispatch(deleteItem(id));
    navigate('/');
  };

  let itemButton: React.ReactNode;
  if(user?.username === item?.user.username) {
    itemButton = (
      <Box>
        <LoadingButton
          color="primary"
          onClick={removeItem}
          loading={isDeleting}
          disabled={isDeleting}
        >
          Delete
        </LoadingButton>
      </Box>
    );
  }

  let itemInfo: React.ReactNode;
  if(!isOneLoading && item) {
    itemInfo = (
      <Stack maxWidth={700}>
        <Card sx={{display: 'flex'}}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{flex: '1 0 auto'}}>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Call to: <strong>{item.user.displayName} ({item.user.phone})</strong>
              </Typography>
              <Typography variant="h5" color="text.primary">
                <strong>{item.title}</strong>
              </Typography>
              <Typography variant="subtitle1" color="text.primary">
                {item.description}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {item.price}$
              </Typography>
              <CardMedia
                component="img"
                sx={{width: 151}}
                image={cardImage}
              />
            </CardContent>
            {itemButton}
          </Box>
        </Card>
      </Stack>
    );
  }
  return (
    <Stack alignItems="center">
      {itemInfo}
    </Stack>
  );
};

export default ItemInfo;