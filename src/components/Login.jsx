/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import { useAuth } from '../App';

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
    <form
      action=""
      css={css`
        max-width: 90%;
        margin: auto;
        padding: 1rem;
        display: grid;
        gap: 1rem;
        align-items: center;
      `}
    >
      <TextField
        variant="outlined"
        type="text"
        id="username"
        label="Username"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          onChange(e, setUsername);
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          onChange(e, setPassword);
        }}
      />
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          onLogin(username, password);
        }}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
