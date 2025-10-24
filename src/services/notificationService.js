import api from './api';

const notificationService = {
  // Get all notifications
  getNotifications: async (page = 1, limit = 20) => {
    try {
      const response = await api.get('/notifications', {
        params: { page, limit },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch notifications' };
    }
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    try {
      const response = await api.get('/notifications/unread');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch unread notifications' };
    }
  },

  // Get unread count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/notifications/unread-count');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch unread count' };
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.patch(`/notifications/${notificationId}/read`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to mark as read' };
    }
  },

  // Mark all as read
  markAllAsRead: async () => {
    try {
      const response = await api.patch('/notifications/mark-all-read');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to mark all as read' };
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete notification' };
    }
  },

  // Clear all notifications
  clearAll: async () => {
    try {
      const response = await api.delete('/notifications/clear-all');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to clear notifications' };
    }
  },

  // Get notification preferences
  getPreferences: async () => {
    try {
      const response = await api.get('/notifications/preferences');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch preferences' };
    }
  },

  // Update notification preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await api.put('/notifications/preferences', preferences);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update preferences' };
    }
  },
};

export default notificationService;
