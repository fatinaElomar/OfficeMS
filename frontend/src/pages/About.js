import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaClipboardList, FaRobot } from "react-icons/fa";
import aboutBg from "../assets/signup.png";

export default function About() {
  const services = [
    {
      icon: <FaUserTie size={20} color="#c8a951" />,
      title: "Lawyer Connection",
      text: "Find and connect with verified lawyers for your specific legal needs.",
    },
    {
      icon: <FaClipboardList size={20} color="#c8a951" />,
      title: "Legal Requests",
      text: "Submit and manage legal service requests online, anytime.",
    },
    {
      icon: <FaRobot size={20} color="#c8a951" />,
      title: "AI Legal Chat",
      text: "Ask quick questions and get guided answers from our AI assistant.",
    },
  ];

  // Reusable paragraph style
  const paragraphStyle = {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#ddd",
    fontFamily: "system-ui",
    fontWeight: "lighter",
  };

  const serviceParagraphStyle = {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: "system-ui",
    fontWeight: "lighter",
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${aboutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        padding: "60px 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: 36,
          fontWeight: "bold",
          marginBottom: 50,
        }}
      >
        About OfficeMS
      </h1>

      {/* First row: Mission + CEO */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "40px",
          maxWidth: 1200,
          margin: "0 auto 60px",
        }}
      >
        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            padding: "40px 30px",
            borderRadius: 20,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
            Our Mission
          </h2>
          <p style={paragraphStyle}>
            Our mission is to make legal support simple and accessible. Whether
            drafting a contract, resolving a dispute, or seeking advice,
            OfficeMS ensures that clients can easily connect with the right
            lawyer or use our AI assistant for instant answers.
          </p>
        </motion.div>

        {/* CEO Message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            padding: "40px 30px",
            borderRadius: 20,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(12px)",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
            Message from Our CEO
          </h2>
          <p style={paragraphStyle}>
            At OfficeMS, we are shaping the future of legal services by blending
            professional expertise with smart technology. Our priority is ensuring
            that every client feels supported, informed, and confident in their
            legal journey.
          </p>
        </motion.div>
      </div>

      {/* Second row: Services */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "30px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, y: -5 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            style={{
              padding: "30px 20px",
              borderRadius: 15,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              {service.icon}
              <h3
                style={{
                  color: "#c8a951",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                {service.title}
              </h3>
            </div>
            <p style={serviceParagraphStyle}>{service.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
