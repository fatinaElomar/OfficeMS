import React from 'react';

export default function DataTable({ columns, data }){
  return (
    <table className='table'>
      <thead>
        <tr>
          {columns.map((c)=> <th key={c.key}>{c.header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx)=> (
          <tr key={idx}>
            {columns.map((c)=> <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}


