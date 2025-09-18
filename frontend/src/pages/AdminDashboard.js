import React from 'react';
import DataTable from '../components/DataTable';

export default function AdminDashboard(){
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>Manage users</li>
        <li>View all requests and payments</li>
        <li>Reports and commissions</li>
        <li>Quality control</li>
      </ul>
      <DataTable columns={[{ key:'name', header:'Example' }]} data={[{ name:'...' }]} />
    </div>
  );
}


