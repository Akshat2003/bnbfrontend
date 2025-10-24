import api, { handleApiError } from './api';

const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, refreshToken, user } = response.data;

      // Store tokens and user info
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, refreshToken, user } = response.data;

      // Store tokens and user info
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/auth/logout');

      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      return { success: true };
    } catch (error) {
      // Clear local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      return { success: false, error: handleApiError(error) };
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await api.post('/auth/refresh-token', { refreshToken });
      const { token } = response.data;

      localStorage.setItem('token', token);

      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  },

  // Get current user
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService;
