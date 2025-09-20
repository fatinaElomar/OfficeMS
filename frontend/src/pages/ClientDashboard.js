import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaComments,
  FaUser,
  FaEdit,
  FaCheck,
  FaHome,
  FaFolderOpen,
  FaCreditCard,
  FaCog,
  FaRobot,
  FaSpinner,
  FaPlus,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { requestService, paymentService, notificationService } from "../api/services";

export default function ClientProfileDashboard() {
  const { userProfile, userId, loading } = useAuth();
  const [activeSection, setActiveSection] = useState("Legal Requests"); // default
  const [user, setUser] = useState({
    name: "Loading...",
    email: "",
    phone: "",
    role: "Client",
    status: "Active",
    createdAt: "",
    isEmailVerified: false,
  });

  const [clientProfile, setClientProfile] = useState({
    address: "",
    nationalId: "",
    dateOfBirth: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [requests, setRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: ""
  });

  // Load data when component mounts
  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId]);

  // Update user data when profile loads
  useEffect(() => {
    if (userProfile) {
      setUser({
        name: userProfile.name || "Unknown",
        email: userProfile.email || "",
        phone: userProfile.phone || "",
        role: userProfile.role || "Client",
        status: userProfile.status || "Active",
        createdAt: userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "",
        isEmailVerified: userProfile.isEmailVerified || false,
      });
      setTempName(userProfile.name || "");
    }
  }, [userProfile]);

  const loadData = async () => {
    if (!userId) return;
    
    setDataLoading(true);
    try {
      const [requestsRes, paymentsRes, notificationsRes] = await Promise.all([
        requestService.getClientRequests(userId),
        paymentService.getUserPayments(userId),
        notificationService.getUserNotifications(userId)
      ]);
      setRequests(requestsRes.data || []);
      setPayments(paymentsRes.data || []);
      setNotifications(notificationsRes.data || []);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(userId, { name: tempName });
      setUser({ ...user, name: tempName });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update name:', error);
    }
  };

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    try {
      await requestService.createRequest({
        ...newRequest,
        clientId: userId
      });
      setNewRequest({ title: "", description: "" });
      setShowNewRequestForm(false);
      loadData(); // Reload data
    } catch (error) {
      console.error('Failed to create request:', error);
    }
  };

  // Sidebar items
  const sidebarItems = [
    { name: "Home", icon: <FaHome /> },
    { name: "Profile", icon: <FaUser /> },
    { name: "Legal Requests", icon: <FaFolderOpen /> },
    { name: "Payments", icon: <FaCreditCard /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  // Content for each section
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
      case "Home":
        return (
          <div>
            <h2>Welcome to your Dashboard, {user.name}!</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Your Requests</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#007bff' }}>{requests.length}</p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Pending Requests</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#ffc107' }}>
                  {requests.filter(r => r.status === 'new' || r.status === 'InProgress').length}
                </p>
              </div>
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
                <h3>Completed</h3>
                <p style={{ fontSize: '2em', margin: '10px 0', color: '#28a745' }}>
                  {requests.filter(r => r.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
        );
      case "Profile":
        return (
          <div>
            <h3>User Information</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
              <tbody>
                <tr><td style={tdStyle}>Name</td><td style={tdStyle}>{user.name}</td></tr>
                <tr><td style={tdStyle}>Email</td><td style={tdStyle}>{user.email}</td></tr>
                <tr><td style={tdStyle}>Phone</td><td style={tdStyle}>{user.phone}</td></tr>
                <tr><td style={tdStyle}>Role</td><td style={tdStyle}>{user.role}</td></tr>
                <tr><td style={tdStyle}>Status</td><td style={tdStyle}>{user.status}</td></tr>
                <tr><td style={tdStyle}>Created At</td><td style={tdStyle}>{user.createdAt}</td></tr>
                <tr><td style={tdStyle}>Email Verified</td><td style={tdStyle}>{user.isEmailVerified ? "Yes" : "No"}</td></tr>
                <tr><td style={tdStyle}>Address</td><td style={tdStyle}>{clientProfile.address}</td></tr>
                <tr><td style={tdStyle}>National ID</td><td style={tdStyle}>{clientProfile.nationalId}</td></tr>
                <tr><td style={tdStyle}>Date of Birth</td><td style={tdStyle}>{clientProfile.dateOfBirth}</td></tr>
              </tbody>
            </table>
          </div>
        );
      case "Legal Requests":
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Your Legal Requests ({requests.length})</h2>
              <button
                onClick={() => setShowNewRequestForm(true)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <FaPlus /> New Request
              </button>
            </div>
            
            {showNewRequestForm && (
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>Create New Legal Request</h3>
                <form onSubmit={handleCreateRequest}>
                  <div style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Request Title"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <textarea
                      placeholder="Request Description"
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                      required
                      rows="4"
                      style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                      Submit Request
                    </button>
                    <button type="button" onClick={() => setShowNewRequestForm(false)} style={{ background: '#6c757d', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {requests.length === 0 ? (
              <p>No legal requests found. Create your first request above!</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {requests.map(request => (
                  <div key={request.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0 }}>{request.title}</h4>
                      <span style={{ 
                        padding: '5px 10px', 
                        borderRadius: '15px', 
                        fontSize: '12px',
                        background: request.status === 'Completed' ? '#d4edda' : 
                                   request.status === 'InProgress' ? '#fff3cd' : '#f8d7da',
                        color: request.status === 'Completed' ? '#155724' : 
                               request.status === 'InProgress' ? '#856404' : '#721c24'
                      }}>
                        {request.status}
                      </span>
                    </div>
                    <p style={{ margin: '10px 0', color: '#666' }}>{request.description}</p>
                    <small style={{ color: '#999' }}>
                      Created: {new Date(request.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "Payments":
        return (
          <div>
            <h2>Payment History ({payments.length})</h2>
            {payments.length === 0 ? (
              <p>No payments found.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {payments.map(payment => (
                  <div key={payment.id} style={{ background: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #ddd' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0 }}>Invoice #{payment.invoiceNumber}</h4>
                      <span style={{ 
                        padding: '5px 10px', 
                        borderRadius: '15px', 
                        fontSize: '12px',
                        background: payment.status === 'Completed' ? '#d4edda' : '#f8d7da',
                        color: payment.status === 'Completed' ? '#155724' : '#721c24'
                      }}>
                        {payment.status}
                      </span>
                    </div>
                    <p style={{ margin: '10px 0' }}>Amount: ${payment.amount}</p>
                    <p style={{ margin: '10px 0' }}>Method: {payment.paymentMethod}</p>
                    <small style={{ color: '#999' }}>
                      Created: {new Date(payment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "Settings":
        return <h2>Account and notification settings.</h2>;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#2c3e50", color: "white", padding: "20px" }}>
        <h2 style={{ marginBottom: "30px" }}>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
          {sidebarItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontWeight: activeSection === item.name ? "bold" : "normal",
                color: activeSection === item.name ? "#3498db" : "white",
              }}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div
          style={{
            height: "60px",
            background: "#ecf0f1",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 20px",
            gap: "15px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <FaBell size={20} />
          <FaComments size={20} />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaUser size={20} />
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={{ padding: "5px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
                <FaCheck
                  size={20}
                  style={{ color: "green", cursor: "pointer" }}
                  onClick={handleSave}
                />
              </>
            ) : (
              <span
                onClick={() => setIsEditing(true)}
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                {user.name} <FaEdit size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Section Content */}
        <div style={{ padding: "20px" }}>{renderSection()}</div>

        {/* Floating AI Chatbot */}
        <div
          onClick={() => window.location.href = '/chat'}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#3498db",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "28px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
            transition: "all 0.3s ease"
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

const tdStyle = {
  border: "1px solid #ddd",
  padding: "10px",
};
