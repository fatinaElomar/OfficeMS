import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <section className='hero'>
        <h1>Legal services made simple</h1>
        <p>Connect with verified lawyers and manage your legal requests end‑to‑end.</p>
        <Link className='btn btn-primary' to='/signup'>Get started</Link>
      </section>
      <section className='services-overview'>
        <h2>Our Services</h2>
        <ul className='grid-3'>
          <li>Contract drafting</li>
          <li>Legal consultation</li>
          <li>Dispute resolution</li>
        </ul>
      </section>
    </div>
  );
}


