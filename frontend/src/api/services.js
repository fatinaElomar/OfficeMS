import client from './client';

// User services
export const userService = {
  // Get all users (admin only)
  getAllUsers: () => client.get('/Users'),
  
  // Get user by ID
  getUserById: (id) => client.get(`/Users/${id}`),
  
  // Register new user
  register: (userData) => client.post('/Users/register', userData),
  
  // Login user
  login: (credentials) => client.post('/Users/login', credentials),
  
  // Verify email
  verifyEmail: (token) => client.get(`/Users/verify?token=${token}`),
  
  // Resend verification email
  resendVerification: (email) => client.post('/Users/resend', { email }),
  
  // Update user
  updateUser: (id, userData) => client.put(`/Users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => client.delete(`/Users/${id}`),
  
  // Get current user profile
  getProfile: () => client.get('/Users/profile'),
};

// Legal requests services
export const requestService = {
  // Create new legal request
  createRequest: (requestData) => client.post('/LegalRequests', requestData),
  
  // Get requests by client ID
  getClientRequests: (clientId) => client.get(`/LegalRequests/client/${clientId}`),
  
  // Assign request to lawyer/office
  assignRequest: (requestId, assignmentData) => 
    client.put(`/LegalRequests/${requestId}/assign`, assignmentData),
  
  // Start request
  startRequest: (requestId) => client.put(`/LegalRequests/${requestId}/start`),
  
  // Complete request
  completeRequest: (requestId) => client.put(`/LegalRequests/${requestId}/complete`),
  
  // Get all requests (admin/lawyer)
  getAllRequests: () => client.get('/LegalRequests'),
};

// Notifications services
export const notificationService = {
  // Get user notifications
  getUserNotifications: (userId) => client.get(`/Notifications/user/${userId}`),
  
  // Mark notification as read
  markAsRead: (notificationId) => client.put(`/Notifications/${notificationId}/read`),
  
  // Get unread count
  getUnreadCount: (userId) => client.get(`/Notifications/unread-count/${userId}`),
};

// Payments services
export const paymentService = {
  // Get user payments
  getUserPayments: (userId) => client.get(`/Payments/user/${userId}`),
  
  // Create payment
  createPayment: (paymentData) => client.post('/Payments', paymentData),
  
  // Update payment status
  updatePaymentStatus: (paymentId, status) => 
    client.put(`/Payments/${paymentId}/status`, { status }),
};

// Chat services
export const chatService = {
  // Get chat messages for request
  getChatMessages: (requestId) => client.get(`/Chat/request/${requestId}`),
  
  // Get chat messages for user
  getUserChatMessages: (userId) => client.get(`/Chat/user/${userId}`),
  
  // Send message
  sendMessage: (messageData) => client.post('/Chat', messageData),
  
  // Get AI response
  getAiResponse: (messageData) => client.post('/Chat/ai-response', messageData),
};
