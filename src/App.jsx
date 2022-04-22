/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import User from './pages/User';
import { Box } from '@mui/material';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/newpost"
            element={
              <RequireAuth>
                <NewPost />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <User />
              </RequireAuth>
            }
          />
          <Route path="post">
            <Route path=":id" element={<Post />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

const Layout = () => {
  return (
    <SnackbarProvider>
      <Box textAlign="center">
        <Appbar />
        <Box
          component="section"
          css={css`
            max-width: 960px;
            margin: auto;
          `}
        >
          <Outlet />
        </Box>
      </Box>
    </SnackbarProvider>
  );
};

export default App;
