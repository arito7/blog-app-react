/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react';
import { Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import Appbar from './components/Appbar';
import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Post from './pages/Post';
import User from './pages/User';
import { signin, saveJwtToLocal, signout } from './config/helpers';
import { SnackbarProvider } from './contexts/SnackbarContext';

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

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signIn = (username, password, cb) => {
    signin(username, password)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          saveJwtToLocal(data.token);
          setUser(data.user);
          cb();
        } else {
          console.log(data.message);
          cb();
        }
      })
      .catch((err) => console.log(err.message));
    cb();
  };

  const signOut = (cb) => {
    signout();
    setUser(null);
    cb();
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
