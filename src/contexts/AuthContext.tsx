import React, { createContext, useState } from 'react';
import { signin, saveJwtToLocal, signout } from '../config/apiHelpers';
import { useLocation, Navigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  signIn: (username: string, password: string, cb: VoidFunction) => void;
  signOut: (cb: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  const signIn = (username: string, password: string, cb: VoidFunction) => {
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

  const signOut = (cb: VoidFunction) => {
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

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth?.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
