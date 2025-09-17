import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Requests(){
  const [list, setList] = useState([]);
  useEffect(()=> {
    // example: fetch requests for client 1
    axios.get('/api/LegalRequests/client/1').then(r => setList(r.data)).catch(()=>{});
  },[]);
  return (
    <div>
      <h3>Legal Requests</h3>
      <ul>
        {list.map(r => <li key={r.id}>{r.title} - {r.status}</li>)}
      </ul>
    </div>
  );
}
