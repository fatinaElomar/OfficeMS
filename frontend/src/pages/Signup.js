import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "client",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await client.post("/Users/register", form);
      setMessage(
        "Account created. Please check your email to verify your account."
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "url('https://www.shutterstock.com/image-photo/law-symbols-library-background-gavel-600nw-2542338153.jpg') no-repeat center center/cover",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: 380,
          padding: "30px 25px",
          borderRadius: 15,
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 25 }}>
          Create Account
        </h2>

        <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
          {/* Name & Phone */}
          <div style={{ display: "flex", gap: 10, marginBottom: 15 }}>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              placeholder="Full Name"
              style={{
                flex: 1,
                padding: "12px 15px",
                borderRadius: 25,
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 14,
              }}
            />
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Phone"
              style={{
                flex: 1,
                padding: "12px 15px",
                borderRadius: 25,
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 15 }}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
              placeholder="Email"
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: 25,
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 15 }}>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              required
              placeholder="Password"
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: 25,
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 14,
              }}
            />
          </div>

          {/* Role */}
          <div style={{ marginBottom: 15 }}>
            <select
              name="role"
              value={form.role}
              onChange={onChange}
              style={{
                width: "100%",
                padding: "12px 15px",
                borderRadius: 25,
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: 14,
              }}
            >
              <option value="client">Client</option>
              <option value="lawyer">Lawyer</option>
              <option value="office">Office</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Messages */}
          {error && (
            <div
              style={{
                background: "rgba(255,0,0,0.2)",
                padding: 8,
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 15,
              }}
            >
              {error}
            </div>
          )}
          {message && (
            <div
              style={{
                background: "rgba(0,255,0,0.2)",
                padding: 8,
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 15,
              }}
            >
              {message}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 25,
              background: "#fff",
              color: "#333",
              fontWeight: "bold",
              fontSize: 15,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Creating…" : "Create account"}
          </button>

          <p
            style={{
              fontSize: 13,
              marginTop: 15,
              textAlign: "center",
              color: "#fff",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
