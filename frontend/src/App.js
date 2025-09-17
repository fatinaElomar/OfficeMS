import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';

export default function App(){
  return (
    <div style={{padding:20}}>
      <h2>Office Management System (Frontend)</h2>
      <nav>
        <Link to='/requests'>Requests</Link> | <Link to='/payments'>Payments</Link> | <Link to='/notifications'>Notifications</Link> | <Link to='/chat'>Chat</Link>
      </nav>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/requests' element={<Requests/>} />
        <Route path='/payments' element={<Payments/>} />
        <Route path='/notifications' element={<Notifications/>} />
        <Route path='/chat' element={<Chat/>} />
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}
