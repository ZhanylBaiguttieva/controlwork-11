import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectItem, selectOneItemLoading } from '../itemsSlice.ts';

import { apiURL } from '../../../../constants.ts';
import {  Box, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { fetchOneItem } from '../itemsThunk.ts';
import { useParams } from 'react-router-dom';

const ItemInfo = () => {
  const dispatch =useAppDispatch();
  const item = useAppSelector(selectItem);
  const isOneLoading = useAppSelector(selectOneItemLoading);
  const {id} = useParams() as {id: string};

  useEffect(() => {
    dispatch(fetchOneItem(id));
  }, [dispatch, id]);

  const cardImage = apiURL + '/' + item?.image;

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