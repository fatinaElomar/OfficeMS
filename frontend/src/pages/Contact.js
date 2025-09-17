import React, { useState } from 'react';

export default function Contact(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className='container'>
      <h1>Contact Us</h1>
      <div className='grid-2'>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label>Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label>Email</label>
            <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className='form-group'>
            <label>Message</label>
            <textarea rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} required />
          </div>
          <button className='btn btn-primary'>Send</button>
          {sent && <div className='success' style={{marginTop:12}}>Thanks! We will get back to you.</div>}
        </form>
        <div>
          <iframe
            title='map'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.95373631590492!3d-37.8162797420217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ5JzAwLjYiUyAxNDTCsDU3JzE0LjQiRQ!5e0!3m2!1sen!2s!4v1614012345678'
            width='100%'
            height='380'
            style={{ border: 0 }}
            allowFullScreen=''
            loading='lazy'
          />
        </div>
      </div>
    </div>
  );
}


