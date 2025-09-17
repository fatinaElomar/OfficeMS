import React, { useState } from 'react';
import axios from 'axios';

export default function Chat(){
  const [msg, setMsg] = useState('');
  const [hist, setHist] = useState([]);
  const send = async ()=> {
    const res = await axios.post('/api/Chat', { requestId: null, userId:1, message: msg, role:'user' });
    setHist([...hist, res.data]);
    setMsg('');
  };
  return (
    <div>
      <h3>AI Chat</h3>
      <div>
        {hist.map((h,i)=> <div key={i}><b>{h.role}</b>: {h.message}</div>)}
      </div>
      <input value={msg} onChange={e=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
}
