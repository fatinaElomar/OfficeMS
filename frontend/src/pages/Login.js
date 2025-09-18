import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await client.post("/Users/login", { email, password });
      const token = res?.data?.token;
      if (!token) throw new Error("No token returned");
      setToken(token);
      navigate("/dashboard");
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
          Login
        </h2>

        <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: 15 }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              required
              autoComplete="email"
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

          <div style={{ marginBottom: 15 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
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

          {error && (
            <div
              style={{
                background: "rgba(255, 0, 0, 0.2)",
                padding: 8,
                borderRadius: 8,
                fontSize: 13,
                marginBottom: 15,
              }}
            >
              {error}
            </div>
          )}

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
            {loading ? "Signing in…" : "Login"}
          </button>

          <p
            style={{
              fontSize: 13,
              marginTop: 15,
              textAlign: "center",
              color: "#fff",
            }}
          >
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
