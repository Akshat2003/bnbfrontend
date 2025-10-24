import api from './api';

const messageService = {
  // Get all conversations
  getConversations: async () => {
    try {
      const response = await api.get('/messages/conversations');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch conversations' };
    }
  },

  // Get conversation messages
  getMessages: async (conversationId, page = 1, limit = 50) => {
    try {
      const response = await api.get(`/messages/conversations/${conversationId}`, {
        params: { page, limit },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch messages' };
    }
  },

  // Send message
  sendMessage: async (recipientId, messageData) => {
    try {
      const response = await api.post('/messages', {
        recipientId,
        ...messageData,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to send message' };
    }
  },

  // Mark messages as read
  markAsRead: async (conversationId) => {
    try {
      const response = await api.patch(`/messages/conversations/${conversationId}/read`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to mark as read' };
    }
  },

  // Delete message
  deleteMessage: async (messageId) => {
    try {
      const response = await api.delete(`/messages/${messageId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete message' };
    }
  },

  // Delete conversation
  deleteConversation: async (conversationId) => {
    try {
      const response = await api.delete(`/messages/conversations/${conversationId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete conversation' };
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/messages/unread-count');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch unread count' };
    }
  },

  // Start conversation with property owner
  startConversation: async (ownerId, propertyId, initialMessage) => {
    try {
      const response = await api.post('/messages/start-conversation', {
        ownerId,
        propertyId,
        message: initialMessage,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to start conversation' };
    }
  },
};

export default messageService;
