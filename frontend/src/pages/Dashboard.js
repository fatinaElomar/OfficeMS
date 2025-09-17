import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard(){
  const { token } = useAuth();
  return (
    <div>
      <h3>Dashboard</h3>
      <p>You are logged in.</p>
      {token && (
        <details>
          <summary>Token (truncated)</summary>
          <code style={{wordBreak:'break-all'}}>{token.slice(0, 40)}...</code>
        </details>
      )}
    </div>
  );
}
