import React, { useState, useEffect } from 'react';
import { FaBell, FaUser, FaEdit, FaCheck, FaRobot, FaUsers, FaFolderOpen, FaChartBar, FaClipboardCheck, FaSpinner } from 'react-icons/fa';
import DataTable from '../components/DataTable';
import { useAuth } from '../context/AuthContext';
import { userService, requestService, notificationService } from '../api/services';

export default function AdminDashboard() {
  const { userProfile, loading } = useAuth();
  const [activeSection, setActiveSection] = useState('Manage Users'); // default section
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('Admin');
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const sidebarItems = [
    { name: 'Manage Users', icon: <FaUsers /> },
    { name: 'Requests & Payments', icon: <FaFolderOpen /> },
    { name: 'Reports & Commissions', icon: <FaChartBar /> },
    { name: 'Quality Control', icon: <FaClipboardCheck /> },
  ];

  // Load data when component mounts
  useEffect(() => {
    loadData();
  }, []);

  // Update user name when profile loads
  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.name || 'Admin');
    }
  }, [userProfile]);

  const loadData = async () => {
    setDataLoading(true);
    try {
      const [usersRes, requestsRes] = await Promise.all([
        userService.getAllUsers(),
        requestService.getAllRequests()
      ]);
      setUsers(usersRes.data || []);
      setRequests(requestsRes.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const renderSection = () => {
    if (dataLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <FaSpinner className="fa-spin" size={30} />
          <span style={{ marginLeft: '10px' }}>Loading...</span>
        </div>
      );
    }

    switch (activeSection) {
      case 'Manage Users':
        return (
          <div>
            <h2>Manage Users ({users.length})</h2>
            <DataTable 
              columns={[
                { key: 'name', header: 'Name' }, 
                { key: 'email', header: 'Email' },
                { key: 'role', header: 'Role' },
                { key: 'status', header: 'Status' },
                { key: 'createdAt', header: 'Created' }
              ]} 
              data={users.map(user => ({
                ...user,
                createdAt: new Date(user.createdAt).toLocaleDateString()
              }))} 
            />
          </div>
        );
      case 'Requests & Payments':
        return (
          <div>
            <h2>Legal Requests ({requests.length})</h2>
            <DataTable 
              columns={[
                { key: 'title', header: 'Title' }, 
                { key: 'status', header: 'Status' },
                { key: 'clientId', header: 'Client ID' },
                { key: 'lawyerId', header: 'Lawyer ID' }
              ]} 
              data={requests} 
            />
          </div>
        );
      case 'Reports & Commissions':
        return (
          <div>
            <h2>Reports and Commissions</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Total Users</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#007bff' }}>{users.length}</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Total Requests</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#28a745' }}>{requests.length}</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Active Requests</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#ffc107' }}>
                  {requests.filter(r => r.status === 'InProgress').length}
                </p>
              </div>
            </div>
          </div>
        );
      case 'Quality Control':
        return (
          <div>
            <h2>Quality Control Metrics</h2>
            <div style={{ marginTop: '20px' }}>
              <h3>User Status Distribution</h3>
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <div>Active: {users.filter(u => u.status === 'Active').length}</div>
                <div>Inactive: {users.filter(u => u.status === 'Inactive').length}</div>
                <div>Pending: {users.filter(u => u.status === 'Pending').length}</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ display:'flex', height:'100vh', fontFamily:'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width:'300px', background:'#2c3e50', color:'white', padding:'20px' }}>
        <h2 style={{ marginBottom:'30px' }}>Admin</h2>
        <ul style={{ listStyle:'none', padding:0, lineHeight:'2' }}>
          {sidebarItems.map(item => (
            <li
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              style={{
                display:'flex', alignItems:'center', gap:'8px', cursor:'pointer',
                fontWeight: activeSection===item.name ? 'bold':'normal',
                color: activeSection===item.name ? '#3498db' : 'white',
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
        <div 
          onClick={() => window.location.href = '/chat'}
          style={{
            position:'fixed', bottom:'20px', right:'20px', width:'60px', height:'60px',
            borderRadius:'50%', background:'#3498db', display:'flex', justifyContent:'center',
            alignItems:'center', color:'white', fontSize:'28px', cursor:'pointer',
            boxShadow:'0 4px 6px rgba(0,0,0,0.2)', transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.background = '#2980b9';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = '#3498db';
          }}
        >
          <FaRobot />
        </div>
      </div>
    </div>
  );
}
