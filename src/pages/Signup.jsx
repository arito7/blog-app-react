/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Box, Button, Grid, TextField, Card } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveJwtToLocal, signup } from '../config/apiHelpers';
import Loading from '../components/Loading';

const Signup = () => {
  const loading = Loading();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const onSignup = (username, password, rpassword) => {
    loading.setLoading(true);
    signup(username, password, rpassword)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          loading.setLoading(false);
          saveJwtToLocal(data.token);
          navigate.push('/');
        } else {
          loading.setLoading(false);
          setErrMsg(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div
      css={css`
        padding: 1rem;
      `}
    >
      {loading.component}
      {errMsg ? (
        <p
          css={css`
            background-color: #ffadad;
            color: #9b0505;
            border-radius: 0.25rem;
            margin: 1rem;
            padding: 1rem;
          `}
        >
          {errMsg}
        </p>
      ) : null}
      <Form onSignup={onSignup} />
      <div>
        <p>
          Already a member? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

const Form = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');

  return (
    <Box
      component="form"
      action=""
      css={css`
        display: grid;
        gap: 1rem;
        padding: 1rem;
      `}
    >
      <TextField
        label="Username"
        name="username"
        value={password}
        onChange={(v) => {
          setPassword(v.target.value);
        }}
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={username}
        onChange={(v) => {
          setUsername(v.target.value);
        }}
      />

      <TextField
        label="Repeat Password"
        type="password"
        value={rpassword}
        onChange={(e) => {
          setRpassword(e.target.value);
        }}
      />

      <Button
        type="button"
        variant="outlined"
        onClick={() => {
          onSignup(username, password, rpassword);
        }}
      >
        Signup
      </Button>
    </Box>
  );
};

export default Signup;
