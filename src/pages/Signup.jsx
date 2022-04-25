import {
  Box,
  Typography,
  Link,
  Button,
  Grid,
  TextField,
  Card,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveJwtToLocal, signup } from '../config/apiHelpers';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const loading = Loading();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = () => {
    navigate('/login');
  };

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
          auth.signIn(username, password, () => {
            navigate('/');
          });
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
    <Box p="2rem">
      {loading.component}
      <Box sx={{ display: 'grid', gap: '1rem' }}>
        <Typography color="primary" variant="h4" component="h2">
          MyBlogApp
        </Typography>
        <Typography variant="h6">
          Join{' '}
          <Typography variant="h5" color="secondary" component="span">
            tens
          </Typography>{' '}
          of users and share your exciting stories!
        </Typography>
      </Box>
      {errMsg ? <p>{errMsg}</p> : null}
      <Form onSignup={onSignup} />
      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gap: '.5rem',
          justifyContent: 'center',
          gridTemplateColumns: 'repeat(2, auto)',
        }}
      >
        <Typography variant="body1">Already a member?</Typography>
        <Link component="button" variant="body1" onClick={handleLogin}>
          Login here
        </Link>
      </Box>
    </Box>
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
      sx={{
        display: 'grid',
        gap: '1rem',
        padding: '1rem',
      }}
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
