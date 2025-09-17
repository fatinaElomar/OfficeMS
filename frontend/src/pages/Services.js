import React from 'react';

export default function Services(){
  const items = [
    { title: 'Contract drafting', desc: 'Legally sound contracts tailored to your needs.' },
    { title: 'Consultation', desc: 'Book a session with a qualified lawyer.' },
    { title: 'Dispute resolution', desc: 'Guidance and representation for disputes.' }
  ];
  return (
    <div className='container'>
      <h1>Services</h1>
      <div className='grid-3'>
        {items.map((s, i) => (
          <div className='card' key={i}>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


