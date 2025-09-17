import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }){
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate('/login'); };
  return (
    <div>
      <Navbar />
      <main className='container'>
        {children}
      </main>
    </div>
  );
}


