import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

function decodeJwt(token){
  try {
    const payload = token.split('.')[1];
    const json = JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')));
    return json || {};
  } catch { return {}; }
}

const AuthContext = createContext({ token: null, setToken: () => {}, logout: () => {} });

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));

  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }, [token]);

  const logout = () => setToken(null);

  const user = useMemo(() => token ? decodeJwt(token) : null, [token]);
  const role = user?.role || user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  const userId = user?.nameid || user?.sub || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  const email = user?.email || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null;

  const value = useMemo(() => ({ token, setToken, logout, user, role, userId, email }), [token, user, role, userId, email]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  return useContext(AuthContext);
}
