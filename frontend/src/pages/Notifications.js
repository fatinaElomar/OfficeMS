import React from 'react';
import axios from 'axios';

export default function Notifications(){
  const send = async ()=> {
    await axios.post('/api/Notifications', { userId:1, type:'system', title:'Welcome', message:'Welcome to OMS' });
    alert('sent');
  };
  return (
    <div>
      <h3>Notifications</h3>
      <button onClick={send}>Send Test Notification</button>
    </div>
  );
}
