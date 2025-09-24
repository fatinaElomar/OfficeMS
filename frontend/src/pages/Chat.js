import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { chatService } from '../api/services';

export default function Chat() {
  const { userId } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (userId) loadChatHistory();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadChatHistory = async () => {
    if (!userId) return;
    try {
      const response = await chatService.getUserChatMessages(userId);
      setMessages(response.data || []);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = {
      requestId: selectedRequestId,
      userId,
      message: message.trim(),
      role: 'user'
    };

    setLoading(true);
    setMessage('');

    try {
      const response = await chatService.getAiResponse(userMessage);
      setMessages(prev => [...prev, userMessage, response.data]);

      if (!selectedRequestId) loadChatHistory();
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        message: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        createdAt: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setSelectedRequestId(null);
    setMessages([]);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif', background: '#f5f5f5' }}>
      {/* Sidebar */}
      <div style={{ width: '300px', background: '#2c3e50', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaRobot /> AI Legal Assistant
        </h2>
        <button onClick={startNewChat} style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px' }}>
          Start New Chat
        </button>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <h4>Recent Conversations</h4>
          <p style={{ fontSize: '14px', color: '#bdc3c7' }}>Your chat history will appear here</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'white' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #eee', background: '#f8f9fa' }}>
          <h3>AI Legal Assistant</h3>
          <p style={{ color: '#666', margin: '5px 0 0 0' }}>Ask me anything about your legal matters, case status, or general legal questions.</p>
        </div>

        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#fafafa' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
              <FaRobot size={48} style={{ marginBottom: '20px', color: '#3498db' }} />
              <h4>Welcome to AI Legal Assistant</h4>
              <p>Start a conversation by typing your legal question below.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={msg.id || index} style={{ display: 'flex', marginBottom: '15px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '70%', padding: '12px 16px', borderRadius: '18px', background: msg.role === 'user' ? '#3498db' : '#ecf0f1', color: msg.role === 'user' ? 'white' : '#2c3e50', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  {msg.role === 'assistant' && <FaRobot size={16} style={{ marginTop: '2px', flexShrink: 0 }} />}
                  {msg.role === 'user' && <FaUser size={16} style={{ marginTop: '2px', flexShrink: 0 }} />}
                  <div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '15px' }}>
              <div style={{ padding: '12px 16px', borderRadius: '18px', background: '#ecf0f1', color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaRobot size={16} />
                <FaSpinner className="fa-spin" size={16} />
                <span>AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid #eee', background: 'white' }}>
          <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your legal question here..."
              disabled={loading}
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #ddd', borderRadius: '25px', outline: 'none', fontSize: '14px' }}
            />
            <button type="submit" disabled={!message.trim() || loading} style={{ background: '#3498db', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!message.trim() || loading) ? 0.5 : 1 }}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
