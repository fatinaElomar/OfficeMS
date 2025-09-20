import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { token, logout, role, userProfile } = useAuth();

  return (
    <footer
      style={{
        background: "transparent",       
        color: "#fffff0ad",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Left side */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link
          to="/"
          style={{ color: "#ffffffc7", fontWeight: "bold", fontSize: 18, textDecoration: "none" }}
        >
          OfficeMS
        </Link>
        <Link to="/services" style={{ color: "#ffffffc7", textDecoration: "none" }}>
          Services
        </Link>
        <Link to="/about" style={{ color: "#ffffffc7", textDecoration: "none" }}>
          About
        </Link>
        <Link to="/contact" style={{ color: "#ffffffc7", textDecoration: "none" }}>
          Contact
        </Link>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {token ? (
          <>
            {role === 'admin' && <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>Admin</Link>}
            {role === 'office' && <Link to="/office" style={{ color: "#fff", textDecoration: "none" }}>Office</Link>}
            {role === 'lawyer' && <Link to="/lawyer" style={{ color: "#fff", textDecoration: "none" }}>Lawyer</Link>}
            {role === 'client' && <Link to="/client" style={{ color: "#fff", textDecoration: "none" }}>Client</Link>}
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
            <span style={{ color: "#fff", fontSize: "14px" }}>
              {userProfile?.name || 'User'}
            </span>
            <button
              onClick={logout}
              style={{
                background: "transparent",
                border: "1px solid #fff",
                borderRadius: 20,
                padding: "6px 14px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
            <Link to="/signup" style={{ color: "#fff", textDecoration: "none" }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </footer>
  );
}
