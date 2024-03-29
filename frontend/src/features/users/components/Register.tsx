
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link, Avatar, Box, Button, Grid, TextField, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectRegisterError } from '../usersSlice.ts';
import { useState } from 'react';
import { RegisterMutation } from '../../../../types';
import { register } from '../usersThunk.ts';
const Register = () => {

  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<RegisterMutation>({
    username: '',
    password: '',
    displayName:'',
    phone: '',
  });

  const getFieldError  = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState(prevState => {
      return {...prevState, [name]: value};
    });
  };
  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(state)).unwrap();
      navigate('/');
    } catch(e) {

    }
  };
  return (

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Username"
                name="username"
                autoComplete="new-username"
                value={state.username}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('username'))}
                helperText={getFieldError('username')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                value={state.password}
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('password'))}
                helperText={getFieldError('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="displayName"
                label="Display name"
                type="displayName"
                autoComplete="displayName"
                value={state.displayName}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                name="phone"
                label="Phone number"
                type="phone"
                autoComplete="phone"
                value={state.phone}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;