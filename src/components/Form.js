import { Box, Button, Grid, TextField } from '@mui/material';
import { API_ENDPOINT } from '../config/constants';
import { useState } from 'react';

const Form = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    fetch(`${API_ENDPOINT}/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const onSignup = () => {
    console.log(username, password);
    fetch(`${API_ENDPOINT}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Box component="form" action="">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="username"
            value={password}
            onChange={(v) => {
              setPassword(v.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type="password"
            name="password"
            value={username}
            onChange={(v) => {
              setUsername(v.target.value);
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="button" variant="outlined" onClick={onLogin}>
            Login
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="button" variant="outlined" onClick={onSignup}>
            Signup
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
