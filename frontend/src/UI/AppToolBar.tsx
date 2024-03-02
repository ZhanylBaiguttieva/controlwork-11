import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/usersSlice.ts';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu.tsx';
import UnRegisteredMenu from './UnRegisteredMenu.tsx';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to="/">Flea Market</Link>
          </Typography>
          { user ? (
            <UserMenu user={user}/>
          ) : (
            <UnRegisteredMenu/>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolBar;