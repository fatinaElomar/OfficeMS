import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { userService } from '../api/services';

function decodeJwt(token){
  try {
    const payload = token.split('.')[1];
    const json = JSON.parse(atob(payload.replace(/-/g,'+').replace(/_/g,'/')));
    return json || {};
  } catch { return {}; }
}

const AuthContext = createContext({ 
  token: null, 
  setToken: () => {}, 
  logout: () => {}, 
  user: null, 
  userProfile: null,
  loading: false 
});

export function AuthProvider({ children }){
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'));
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
      // Fetch user profile when token is available
      fetchUserProfile();
    } else {
      localStorage.removeItem('auth_token');
      setUserProfile(null);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const user = decodeJwt(token);
      const userId = user?.nameid || user?.sub || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      
      if (userId) {
        const response = await userService.getUserById(userId);
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUserProfile(null);
  };

  const user = useMemo(() => token ? decodeJwt(token) : null, [token]);
  const role = user?.role || user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  const userId = user?.nameid || user?.sub || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null;
  const email = user?.email || user?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || null;

  const value = useMemo(() => ({ 
    token, 
    setToken, 
    logout, 
    user, 
    userProfile,
    role, 
    userId, 
    email,
    loading,
    refreshProfile: fetchUserProfile
  }), [token, user, userProfile, role, userId, email, loading]);
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
  return useContext(AuthContext);
}
