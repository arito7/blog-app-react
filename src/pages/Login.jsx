/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';
import { useSnackbar } from '../contexts/SnackbarContext';

const Login = () => {
  const loading = Loading();

  return (
    <div>
      {loading.component}
      <Form loading={loading} />
      <div>
        <p>
          Not a member yet? <Link to="/signup">Join us!</Link>{' '}
        </p>
      </div>
    </div>
  );
};

const Form = ({ loading }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const snackbar = useSnackbar();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameHelper, setUsernameHelper] = useState('');
  const [passwordHelper, setPasswordHelper] = useState('');

  let from = location.state?.from?.pathname || '/';

  const usernameRegex = /^[a-z0-9]+$/i;

  const onLogin = (username, password) => {
    if (usernameRegex.test(username) && password.length > 2) {
      loading.setLoading(true);
      auth.signIn(username, password, () => {
        loading.setLoading(false);
        snackbar.setSeverity('success');
        snackbar.setMessage('Welcome Back!');
        snackbar.setOpen(true);
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <Box component="form">
      <Grid container gap="1rem" p="1rem">
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            type="text"
            label="Username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value.length === 0) {
                setUsernameHelper('Username cannot be empty.');
                return;
              } else if (e.target.value.length < 4) {
                setUsernameHelper('Username is too short.');
                return;
              } else if (!usernameRegex.test(e.target.value)) {
                setUsernameHelper(
                  "Username shouldn't contain any special characters."
                );
                return;
              } else {
                setUsernameHelper('');
              }
            }}
            error={usernameHelper}
            helperText={usernameHelper}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length === 0) {
                setPasswordHelper('Password cannot be empty.');
                return;
              } else if (e.target.value.length < 4) {
                setPasswordHelper('Password is too short');
                return;
              } else {
                setPasswordHelper('');
              }
            }}
            error={passwordHelper}
            helperText={passwordHelper}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              onLogin(username, password);
            }}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
