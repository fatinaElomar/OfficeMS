import React, { useState } from 'react';
import axios from 'axios';

export default function Payments(){
  const [invoice, setInvoice] = useState('');
  const [result, setResult] = useState(null);
  const create = async () => {
    const p = { clientId: 1, amount: 50.00, paymentMethod: 'card', invoiceNumber: invoice };
    const res = await axios.post('/api/Payments', p).catch(e=>null);
    setResult(res?.data || null);
  };
  return (
    <div>
      <h3>Payments</h3>
      <input value={invoice} onChange={e=>setInvoice(e.target.value)} placeholder="invoice" />
      <button onClick={create}>Create Payment</button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
