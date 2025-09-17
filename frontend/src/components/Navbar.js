import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar(){
  const { token, logout } = useAuth();
  return (
    <nav className='navbar'>
      <div className='nav-left'>
        <Link to='/' className='brand'>OfficeMS</Link>
        <Link to='/services'>Services</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </div>
      <div className='nav-right'>
        {!token && (
          <>
            <Link to='/login'>Login</Link>
            <Link className='btn btn-primary' to='/signup'>Sign up</Link>
          </>
        )}
        {token && (
          <>
            <Link to='/dashboard'>Dashboard</Link>
            <button className='btn' onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}


