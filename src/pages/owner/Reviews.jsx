import { useState, useEffect } from 'react';
import { FaStar, FaReply, FaThumbsUp, FaFilter } from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import { formatDate } from '@utils/formatters';
import { useAuth } from '@context/AuthContext';

const OwnerReviews = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [filterProperty, setFilterProperty] = useState('all');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockReviews = [
          {
            id: '1',
            propertyName: 'Downtown Plaza',
            spaceName: 'Premium Covered #A1',
            guestName: 'John Doe',
            guestAvatar: null,
            rating: 5,
            comment: 'Excellent parking space! Very convenient location and well-maintained. The covered area kept my car protected from the elements. Highly recommend!',
            date: new Date('2024-10-20'),
            hasResponse: true,
            response: {
              text: 'Thank you so much for your kind words! We\'re glad you had a great experience.',
              date: new Date('2024-10-21')
            },
            helpful: 12
          },
          {
            id: '2',
            propertyName: 'Airport Hub',
            spaceName: 'Open Lot #5',
            guestName: 'Jane Smith',
            guestAvatar: null,
            rating: 4,
            comment: 'Good parking spot close to the airport. Easy access and reasonable pricing. Only minor issue was some construction nearby but overall satisfied.',
            date: new Date('2024-10-18'),
            hasResponse: false,
            response: null,
            helpful: 8
          },
          {
            id: '3',
            propertyName: 'Shopping Mall',
            spaceName: 'Garage #12',
            guestName: 'Mike Johnson',
            guestAvatar: null,
            rating: 5,
            comment: 'Perfect spot for shopping trips! Secure garage with good lighting. The owner was very responsive and helpful.',
            date: new Date('2024-10-15'),
            hasResponse: true,
            response: {
              text: 'We appreciate your feedback! Happy to help anytime.',
              date: new Date('2024-10-16')
            },
            helpful: 15
          },
          {
            id: '4',
            propertyName: 'Downtown Plaza',
            spaceName: 'Premium Covered #A2',
            guestName: 'Sarah Williams',
            guestAvatar: null,
            rating: 3,
            comment: 'Decent parking space but a bit pricey for the area. The space was clean but smaller than expected for an SUV.',
            date: new Date('2024-10-12'),
            hasResponse: false,
            response: null,
            helpful: 5
          },
          {
            id: '5',
            propertyName: 'Airport Hub',
            spaceName: 'Open Lot #3',
            guestName: 'Robert Brown',
            guestAvatar: null,
            rating: 5,
            comment: 'Amazing service! The location is perfect for airport travelers. Will definitely book again.',
            date: new Date('2024-10-10'),
            hasResponse: true,
            response: {
              text: 'Thank you! We look forward to hosting you again soon!',
              date: new Date('2024-10-11')
            },
            helpful: 20
          }
        ];

        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReviews();
    }
  }, [user]);

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesRating = filterRating === 'all' || review.rating === parseInt(filterRating);
    const matchesProperty = filterProperty === 'all' || review.propertyName === filterProperty;
    return matchesRating && matchesProperty;
  });

  // Get unique properties
  const properties = ['all', ...new Set(reviews.map(r => r.propertyName))];

  // Calculate stats
  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    needsResponse: reviews.filter(r => !r.hasResponse).length,
    distribution: [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: reviews.filter(r => r.rating === rating).length,
      percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
    }))
  };

  // Handle submit response
  const handleSubmitResponse = async (reviewId) => {
    if (!replyText.trim()) return;

    try {
      // TODO: API call to submit response
      setReviews(reviews.map(r =>
        r.id === reviewId
          ? {
              ...r,
              hasResponse: true,
              response: {
                text: replyText,
                date: new Date()
              }
            }
          : r
      ));
      setReplyingTo(null);
      setReplyText('');
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reviews & Ratings</h1>
        <p className="mt-2 text-gray-600">
          Manage reviews across all your properties
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Average Rating</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-bold text-gray-900">{stats.average}</p>
              <FaStar className="text-yellow-500 text-2xl" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Needs Response</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.needsResponse}</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Response Rate</p>
            <p className="text-3xl font-bold text-green-600">
              {((reviews.filter(r => r.hasResponse).length / reviews.length) * 100).toFixed(0)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Rating Distribution */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {stats.distribution.map((item) => (
            <div key={item.rating} className="flex items-center gap-4">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                <FaStar className="text-yellow-500 text-sm" />
              </div>
              <div className="flex-1">
                <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-yellow-500 rounded-lg transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
              <span className="w-16 text-sm text-gray-600 text-right">
                {item.count} ({item.percentage.toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <select
            value={filterProperty}
            onChange={(e) => setFilterProperty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {properties.map(property => (
              <option key={property} value={property}>
                {property === 'all' ? 'All Properties' : property}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Reviews List */}
      {filteredReviews.length === 0 ? (
        <Card className="text-center py-12">
          <FaStar className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reviews found
          </h3>
          <p className="text-gray-600">
            {filterRating !== 'all' || filterProperty !== 'all'
              ? 'Try adjusting your filters'
              : 'Reviews will appear here once guests leave feedback'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg flex-shrink-0">
                    {review.guestName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.guestName}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{review.propertyName}</span>
                      <span>•</span>
                      <span>{review.spaceName}</span>
                    </div>
                    <p className="text-sm text-gray-500">{formatDate(review.date, 'PPP')}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>

              {/* Review Content */}
              <p className="text-gray-700 mb-4">{review.comment}</p>

              {/* Helpful Counter */}
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FaThumbsUp className="text-gray-400" />
                <span>{review.helpful} people found this helpful</span>
              </div>

              {/* Owner Response */}
              {review.hasResponse ? (
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary-500">
                  <div className="flex items-start gap-3">
                    <div className="text-primary-600 mt-1">
                      <FaReply />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-1">Your Response</p>
                      <p className="text-gray-700 text-sm">{review.response.text}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(review.response.date, 'PPP')}
                      </p>
                    </div>
                  </div>
                </div>
              ) : replyingTo === review.id ? (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-medium text-gray-900 mb-3">Write a Response</p>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={4}
                    placeholder="Thank you for your feedback..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleSubmitResponse(review.id)}
                      disabled={!replyText.trim()}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium disabled:bg-gray-400"
                    >
                      Submit Response
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyText('');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setReplyingTo(review.id)}
                  className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 text-sm font-medium"
                >
                  <FaReply className="mr-2" />
                  Respond to Review
                </button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerReviews;
