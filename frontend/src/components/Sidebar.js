import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ items }){
  return (
    <aside className='sidebar'>
      <ul>
        {items.map((i) => (
          <li key={i.to}><NavLink to={i.to}>{i.label}</NavLink></li>
        ))}
      </ul>
    </aside>
  );
}


