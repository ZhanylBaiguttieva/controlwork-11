import { Item } from '../../../../types';
import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, styled } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { apiURL } from '../../../../constants.ts';
interface Props {
  item: Item;
}

const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});


const ItemPresent: React.FC<Props> = ({item}) => {
  const cardImage = apiURL + '/' + item.image;

  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}} component={RouterLink} to={'/items/' + item._id}>
        <CardHeader title={item.title}/>
        <ImageCardMedia image={cardImage} title={item.title}/>
        <CardContent>
          <strong>{item.price} KGS</strong>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ItemPresent;