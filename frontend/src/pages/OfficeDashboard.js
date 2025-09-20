import React, { useState } from 'react';
import { FaBell, FaUser, FaEdit, FaCheck, FaRobot, FaUsers, FaQrcode, FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

export default function OfficeDashboard() {
  const [activeSection, setActiveSection] = useState('Linked Lawyers'); // default section
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Office Admin');

  const sidebarItems = [
    { name: 'Linked Lawyers', icon: <FaUsers /> },
    { name: 'Generate QR', icon: <FaQrcode /> },
    { name: 'Commissions & Clients', icon: <FaMoneyBillWave /> },
    { name: 'Earnings Reports', icon: <FaChartLine /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'Linked Lawyers':
        return <h2>Manage all linked lawyers here.</h2>;
      case 'Generate QR':
        return <h2>Generate QR codes for client referrals.</h2>;
      case 'Commissions & Clients':
        return <h2>View commissions and referred clients.</h2>;
      case 'Earnings Reports':
        return <h2>View earnings reports and statistics.</h2>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width:'220px', background:'#2c3e50', color:'white', padding:'20px' }}>
        <h2 style={{ marginBottom:'30px' }}>Office</h2>
        <ul style={{ listStyle:'none', padding:0, lineHeight:'2' }}>
          {sidebarItems.map(item => (
            <li
              key={item.name}
              onClick={()=>setActiveSection(item.name)}
              style={{
                display:'flex',
                alignItems:'center',
                gap:'8px',
                cursor:'pointer',
                fontWeight: activeSection===item.name ? 'bold':'normal',
                color: activeSection===item.name ? '#3498db' : 'white'
              }}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        {/* Header */}
        <div style={{
          height:'60px', background:'#ecf0f1', display:'flex',
          justifyContent:'flex-end', alignItems:'center', padding:'0 20px', gap:'15px',
          borderBottom:'1px solid #ccc'
        }}>
          <FaBell size={20} />
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <FaUser size={20} />
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={userName}
                  onChange={(e)=>setUserName(e.target.value)}
                  style={{ padding:'5px', border:'1px solid #ccc', borderRadius:'4px' }}
                />
                <FaCheck size={20} style={{ color:'green', cursor:'pointer' }} onClick={()=>setIsEditing(false)} />
              </>
            ) : (
              <span onClick={()=>setIsEditing(true)}
                style={{ cursor:'pointer', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px' }}>
                {userName} <FaEdit size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Section Content */}
        <div style={{ padding:'20px', flex:1, overflowY:'auto' }}>
          {renderSection()}
        </div>

        {/* Floating AI Chatbot */}
        <div style={{
          position:'fixed', bottom:'20px', right:'20px', width:'60px', height:'60px',
          borderRadius:'50%', background:'#3498db', display:'flex', justifyContent:'center',
          alignItems:'center', color:'white', fontSize:'28px', cursor:'pointer',
          boxShadow:'0 4px 6px rgba(0,0,0,0.2)'
        }}>
          <FaRobot />
        </div>
      </div>
    </div>
  );
}
