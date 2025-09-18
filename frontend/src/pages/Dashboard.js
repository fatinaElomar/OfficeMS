import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) return;
    if (role.toLowerCase() === 'admin') navigate('/admin', { replace: true });
    else if (role.toLowerCase() === 'office') navigate('/office', { replace: true });
    else if (role.toLowerCase() === 'lawyer') navigate('/lawyer', { replace: true });
    else navigate('/client', { replace: true });
  }, [role, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-sm text-gray-600 mb-4">
          Welcome back! You are successfully logged in.
        </p>

        <span className="inline-block px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 mb-4">
          ✅ Authenticated
        </span>

        {token && (
          <details className="group border border-gray-200 rounded-lg p-3 bg-gray-50 cursor-pointer mb-4">
            <summary className="font-medium text-gray-700 hover:text-gray-900">
              Token (truncated)
            </summary>
            <code className="block mt-2 text-xs text-gray-600 break-all">
              {token.slice(0, 40)}...
            </code>
          </details>
        )}

        <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
          Go to Profile
        </button>
      </div>
    </div>
  );
}
