import React, { useState } from "react";
import contactBg from "../assets/signup.png"; // background image

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setFile(null);
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${contactBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px 30px",
          borderRadius: 20,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          color: "#fff",
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: "bold", marginBottom: 25, textAlign: "center" }}>
          Contact Us
        </h2>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
            style={inputStyle}
          />
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            📎 Upload file
            <input type="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </label>

          <button type="submit" style={submitButtonStyle}>
            SEND MESSAGE →
          </button>

          {sent && (
            <span style={{ color: "#c8a951", fontWeight: 500, marginTop: 10, textAlign: "center", display: "block" }}>
              Thank you! We will get back to you shortly.
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

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
