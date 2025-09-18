import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { token, logout } = useAuth();

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
        {token && (
          <>
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
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
        )}
      </div>
    </footer>
  );
}
