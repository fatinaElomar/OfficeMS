import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PasswordReset from './pages/PasswordReset';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Payments from './pages/Payments';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import AdminDashboard from './pages/AdminDashboard';
import OfficeDashboard from './pages/OfficeDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import RoleRoute from './components/RoleRoute';

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/reset-password' element={<PasswordReset/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><RoleRoute roles={['admin']}><AdminDashboard/></RoleRoute></ProtectedRoute>} />
        <Route path='/office' element={<ProtectedRoute><RoleRoute roles={['office']}><OfficeDashboard/></RoleRoute></ProtectedRoute>} />
        <Route path='/lawyer' element={<ProtectedRoute><RoleRoute roles={['lawyer']}><LawyerDashboard/></RoleRoute></ProtectedRoute>} />
        <Route path='/client' element={<ProtectedRoute><RoleRoute roles={['client']}><ClientDashboard/></RoleRoute></ProtectedRoute>} />
        <Route path='/requests' element={<ProtectedRoute><Requests/></ProtectedRoute>} />
        <Route path='/payments' element={<ProtectedRoute><Payments/></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
        <Route path='/chat' element={<ProtectedRoute><Chat/></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
}
