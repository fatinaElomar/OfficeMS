import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import loginBg from "../assets/signup.png"; // same background as signup

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await client.post("/Users/login", form);
      const token = res?.data?.token;
      if (!token) throw new Error("No token returned");
      setToken(token);

      // Decode token to get role
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role =
        payload.role ||
        payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // Redirect by role
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "office":
          navigate("/office");
          break;
        case "lawyer":
          navigate("/lawyer");
          break;
        case "client":
          navigate("/client");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid credentials or server error");
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
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: 380,
          padding: "30px 25px",
          borderRadius: 15,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 25 }}>
          Login
        </h2>

        <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 15 }}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
              required
              autoComplete="email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 15 }}>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Password"
              required
              autoComplete="current-password"
              style={inputStyle}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 13,
              margin: "10px 0 20px",
              color: "#fff",
            }}
          >
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a
              href="/forgot-password"
              style={{ color: "#fff", textDecoration: "underline" }}
            >
              Forgot password?
            </a>
          </div>

          {error && <Message text={error} type="error" />}

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Signing in…" : "Login"}
          </button>

          <p style={{ fontSize: 13, marginTop: 15, textAlign: "center", color: "#fff" }}>
            Don’t have an account?{" "}
            <a
              href="/signup"
              style={{
                color: "#fff",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// Shared styles (same as signup)
const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  borderRadius: 25,
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "#fff",
  fontSize: 14,
};

const submitButtonStyle = {
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
};

const Message = ({ text, type }) => (
  <div
    style={{
      background: type === "error" ? "rgba(255,0,0,0.2)" : "rgba(0,255,0,0.2)",
      padding: 8,
      borderRadius: 8,
      fontSize: 13,
      marginBottom: 15,
    }}
  >
    {text}
  </div>
);
