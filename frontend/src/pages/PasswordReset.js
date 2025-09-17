import React, { useState } from 'react';

export default function PasswordReset(){
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div style={{ maxWidth: 380, margin:'40px auto' }}>
      <div className='card'>
        <h3>Reset password</h3>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Email</label>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <button className='btn btn-primary'>Send reset link</button>
          {sent && <div className='success' style={{marginTop:12}}>Check your email for the reset link.</div>}
        </form>
      </div>
    </div>
  );
}


