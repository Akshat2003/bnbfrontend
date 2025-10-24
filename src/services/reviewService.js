import api from './api';

const reviewService = {
  // Get reviews for a parking space
  getSpaceReviews: async (spaceId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/parking-spaces/${spaceId}/reviews`, {
        params: { page, limit },
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch reviews' };
    }
  },

  // User: Create review
  createReview: async (bookingId, reviewData) => {
    try {
      const response = await api.post(`/bookings/${bookingId}/review`, reviewData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to submit review' };
    }
  },

  // User: Update review
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await api.put(`/reviews/${reviewId}`, reviewData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to update review' };
    }
  },

  // User: Delete review
  deleteReview: async (reviewId) => {
    try {
      const response = await api.delete(`/reviews/${reviewId}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to delete review' };
    }
  },

  // User: Get my reviews
  getMyReviews: async () => {
    try {
      const response = await api.get('/reviews/my-reviews');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch reviews' };
    }
  },

  // Owner: Get reviews for my properties
  getOwnerReviews: async (filters = {}) => {
    try {
      const response = await api.get('/owner/reviews', { params: filters });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to fetch reviews' };
    }
  },

  // Owner: Reply to review
  replyToReview: async (reviewId, replyText) => {
    try {
      const response = await api.post(`/reviews/${reviewId}/reply`, { reply: replyText });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to submit reply' };
    }
  },

  // Report review
  reportReview: async (reviewId, reason) => {
    try {
      const response = await api.post(`/reviews/${reviewId}/report`, { reason });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to report review' };
    }
  },

  // Check if user can review
  canReview: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}/can-review`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Failed to check review eligibility' };
    }
  },
};

export default reviewService;
