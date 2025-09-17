import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext({ token: null, setToken: () => {}, logout: () => {} });

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));

  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }, [token]);

  const logout = () => setToken(null);

  const value = useMemo(() => ({ token, setToken, logout }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  return useContext(AuthContext);
}
