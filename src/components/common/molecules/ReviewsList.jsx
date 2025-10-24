import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiStar, FiThumbsUp, FiFlag } from 'react-icons/fi';
import { Avatar, Button, Pagination } from '@components/common';
import { formatTimeAgo } from '@utils/formatters';
import clsx from 'clsx';

const ReviewsList = ({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onLoadMore,
  isLoading = false,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [helpfulReviews, setHelpfulReviews] = useState({});
  const reviewsPerPage = 5;

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handleHelpfulClick = (reviewId) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const handleReportClick = (reviewId) => {
    // TODO: Implement report functionality
    console.log('Report review:', reviewId);
  };

  // Rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const StarRating = ({ rating }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={clsx(
            'w-4 h-4',
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          )}
        />
      ))}
    </div>
  );

  return (
    <div className={className}>
      {/* Rating Summary */}
      <div className="mb-8">
        <div className="flex items-start gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} />
            <p className="text-sm text-gray-600 mt-2">
              Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 w-8">
                  {rating}★
                </span>
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {displayedReviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedReviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b border-gray-200 last:border-0"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex gap-3">
                  <Avatar
                    src={review.user?.avatar}
                    name={review.user?.name}
                    size="md"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {review.user?.name || 'Anonymous'}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <StarRating rating={review.rating} />
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Report Button */}
                <button
                  onClick={() => handleReportClick(review.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Report review"
                >
                  <FiFlag className="w-4 h-4" />
                </button>
              </div>

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed mb-3">
                {review.comment}
              </p>

              {/* Review Images (if any) */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3">
                  {review.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ))}
                  {review.images.length > 4 && (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-sm font-medium text-gray-600">
                      +{review.images.length - 4}
                    </div>
                  )}
                </div>
              )}

              {/* Owner Response (if any) */}
              {review.ownerReply && (
                <div className="mt-4 ml-12 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Response from owner
                  </p>
                  <p className="text-sm text-gray-700">{review.ownerReply}</p>
                </div>
              )}

              {/* Helpful Button */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => handleHelpfulClick(review.id)}
                  className={clsx(
                    'flex items-center gap-2 text-sm transition-colors',
                    helpfulReviews[review.id]
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <FiThumbsUp
                    className={clsx(
                      'w-4 h-4',
                      helpfulReviews[review.id] && 'fill-current'
                    )}
                  />
                  Helpful ({(review.helpfulCount || 0) + (helpfulReviews[review.id] ? 1 : 0)})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Load More Button */}
      {onLoadMore && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={isLoading}
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      images: PropTypes.arrayOf(PropTypes.string),
      ownerReply: PropTypes.string,
      helpfulCount: PropTypes.number,
    })
  ),
  averageRating: PropTypes.number,
  totalReviews: PropTypes.number,
  onLoadMore: PropTypes.func,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default ReviewsList;
