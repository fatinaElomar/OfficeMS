import React from "react";
import servicesBg from "../assets/about.png"; // You can add a background image for services

export default function Services() {
  const items = [
    { title: "Contract Drafting", desc: "Legally sound contracts tailored to your needs." },
    { title: "Consultation", desc: "Book a session with a qualified lawyer." },
    { title: "Dispute Resolution", desc: "Guidance and representation for disputes." },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${servicesBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          padding: "40px 30px",
          borderRadius: 20,
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(12px)",
          boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 35 }}>
          Our Services
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {items.map((service, i) => (
            <div
              key={i}
              style={{
                padding: "25px 20px",
                borderRadius: 15,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
              }}
            >
              <h3 style={{ fontSize: 22, marginBottom: 15, color: "#fff" }}>
                {service.title}
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: "#ddd" }}>
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
