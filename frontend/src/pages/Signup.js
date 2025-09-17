import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client';

export default function Signup(){
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', role:'client' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault(); setError(''); setMessage(''); setLoading(true);
    try {
      await client.post('/auth/register', form);
      setMessage('Account created. Please check your email to verify your account.');
      setTimeout(()=> navigate('/login'), 2000);
    } catch (err) {
      setError('Signup failed. Email may already exist.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ maxWidth: 480, margin:'40px auto' }}>
      <div className='card'>
        <h3>Create account</h3>
        <form className='form' onSubmit={onSubmit}>
          <div className='grid-2'>
            <div className='form-group'>
              <label>Name</label>
              <input name='name' value={form.name} onChange={onChange} required />
            </div>
            <div className='form-group'>
              <label>Phone</label>
              <input name='phone' value={form.phone} onChange={onChange} />
            </div>
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input type='email' name='email' value={form.email} onChange={onChange} required />
          </div>
          <div className='form-group'>
            <label>Password</label>
            <input type='password' name='password' value={form.password} onChange={onChange} required />
          </div>
          <div className='form-group'>
            <label>Role</label>
            <select name='role' value={form.role} onChange={onChange}>
              <option value='client'>Client</option>
              <option value='lawyer'>Lawyer</option>
              <option value='office'>Office</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          {error && <div className='error'>{error}</div>}
          {message && <div className='success'>{message}</div>}
          <button className='btn btn-primary' disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
        </form>
      </div>
    </div>
  );
}


