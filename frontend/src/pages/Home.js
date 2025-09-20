import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import about from '../assets/about.png';
import services from '../assets/services.png';
import contact from '../assets/contact.png';
import home from '../assets/home.png';

export default function Home() {
  const containerStyle = { width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' };
  const firstSectionStyle = { height: '60%', display: 'flex', flexDirection: 'row' };
  const heroContainerStyle = { flex: '0 0 66.5%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' };
  const overlayStyle = { position: 'absolute', textTransform: 'uppercase', color: 'white', textAlign: 'center', padding: '24px', maxWidth: '400px', zIndex: 2, pointerEvents: 'auto' };
  const rightBoxStyle = { flex: '0 0 33.5%', backgroundColor: '#1a1a1a', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px' };
  const secondSectionStyle = { height: '40%', flex: 1, display: 'flex', flexDirection: 'row', boxSizing: 'border-box' };

  const cardStyle = { flex: 1, position: 'relative', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex' };

  // IMPORTANT: overlay must not block pointer events if you want the image itself to receive hover.
  const cardOverlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    pointerEvents: 'none' 
  };

  const cardTitleStyle = { color: 'white', fontSize: '1rem',  textTransform: 'uppercase', textAlign: 'center', pointerEvents: 'none' };

  return (
    <div style={containerStyle}>
      {/* First Section */}
      <div style={firstSectionStyle}>
        <div style={heroContainerStyle}>
          <motion.img
            src={home}
            alt="Hero"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={overlayStyle}>
           
            <h2 style={{ marginBottom: 24 }}>Connect with verified lawyers and manage your legal requests end-to-end.</h2>
            
          </div>
        </div>

        <div style={rightBoxStyle}>
          <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: 2, opacity: 0.7, marginBottom: 8 }}>Our Services</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: 16 }}>Trusted Legal Expertise</h2>
         
          <Link
              to="/signup"
              style={{ backgroundColor: '#e3d0a7', color: '#1f1010;',  borderRadius: 8,    width:'30%', textDecoration: 'none', padding: '8px 24px' }}
            >
              Get started
            </Link>
        
        </div>
      </div>

      {/* Second Section: Cards */}
      <div style={secondSectionStyle}>
        {[
          { link: '/about', title: 'About Us', image: about },
          { link: '/consultation', title: 'Services', image: services },
          { link: '/contact', title: 'Contact Us', image: contact },
        ].map((card, index) => (
          <div key={index} style={cardStyle}>
            <Link to={card.link} style={{ width: '100%', height: '100%', display: 'block', position: 'relative' }}>
              {/* motion.img receives the hover directly */}
              <motion.img
                src={card.image}
                alt={card.title}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Overlay sits visually above image but does NOT capture pointer events */}
              <div style={cardOverlayStyle}>
                <h3 style={cardTitleStyle}>{card.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
