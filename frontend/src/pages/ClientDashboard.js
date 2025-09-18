import React from 'react';
import FileUpload from '../components/FileUpload';
export default function ClientDashboard(){
  return (
    <div>
      <h1>Client Dashboard</h1>
      <ul>
        <li>Create new legal request</li>
        <li>View request status and files</li>
        <li>Payments & invoices</li>
        <li>AI Chat</li>
        <li>Notifications</li>
      </ul>
      <FileUpload />
    </div>
  );
}


