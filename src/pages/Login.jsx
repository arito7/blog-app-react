/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const loading = Loading();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  let from = location.state?.from?.pathname || '/';

  const onLogin = (username, password) => {
    loading.setLoading(true);
    auth.signIn(username, password, () => {
      loading.setLoading(false);
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      {loading.component}
      <Form onLogin={onLogin} />
      <div>
        <p>
          Not a member yet? <Link to="/signup">Join us!</Link>{' '}
        </p>
      </div>
    </div>
  );
};

const Form = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChange = (e, set) => {
    set(e.target.value);
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
              onChange(e, setUsername);
            }}
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
              onChange(e, setPassword);
            }}
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
