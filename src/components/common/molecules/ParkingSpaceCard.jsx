import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FiMapPin, FiClock, FiDollarSign, FiStar, FiHeart, FiShield, FiZap } from 'react-icons/fi';
import { Card, Badge, Button } from '@components/common';
import { formatCurrency, formatDistance } from '@utils/formatters';

const ParkingSpaceCard = ({
  id,
  title,
  address,
  city,
  distance,
  price,
  priceUnit = 'hour',
  rating,
  reviewCount,
  imageUrl,
  images = [],
  availability,
  features = [],
  propertyType,
  spaceType,
  isFavorite = false,
  onFavoriteToggle,
  className = '',
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  const displayImages = images.length > 0 ? images : [imageUrl];
  const currentImage = displayImages[currentImageIndex] || '/placeholder-parking.jpg';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorited);
    }
  };

  const handlePrevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const featureIcons = {
    covered: <FiShield className="w-4 h-4" />,
    ev_charging: <FiZap className="w-4 h-4" />,
    security: <FiShield className="w-4 h-4" />,
    '24/7': <FiClock className="w-4 h-4" />,
  };

  return (
    <Link to={`/parking-spaces/${id}`}>
      <Card
        className={clsx(
          'overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group',
          className
        )}
        padding="none"
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={currentImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Image Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {displayImages.map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    'w-1.5 h-1.5 rounded-full transition-colors',
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className={clsx(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all',
              isFavorited
                ? 'bg-red-500 text-white'
                : 'bg-white/90 hover:bg-white text-gray-700'
            )}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart className={clsx('w-5 h-5', isFavorited && 'fill-current')} />
          </button>

          {/* Availability Badge */}
          {availability && (
            <div className="absolute top-3 left-3">
              <Badge
                variant={availability === 'available' ? 'success' : 'warning'}
                size="sm"
              >
                {availability === 'available' ? 'Available' : 'Limited'}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Title & Location */}
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <FiMapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{address}, {city}</span>
            </div>
            {distance && (
              <p className="text-xs text-gray-500 mt-1">
                {formatDistance(distance)} away
              </p>
            )}
          </div>

          {/* Type Badges */}
          <div className="flex gap-2 mb-3">
            {propertyType && (
              <Badge variant="default" size="sm">
                {propertyType}
              </Badge>
            )}
            {spaceType && (
              <Badge variant="secondary" size="sm">
                {spaceType}
              </Badge>
            )}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="flex gap-2 mb-3 flex-wrap">
              {features.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                >
                  {featureIcons[feature.toLowerCase()] || <FiShield className="w-3 h-3" />}
                  <span className="capitalize">{feature}</span>
                </div>
              ))}
              {features.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{features.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Rating & Reviews */}
          {rating && (
            <div className="flex items-center gap-1 mb-3">
              <FiStar className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
              {reviewCount > 0 && (
                <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
              )}
            </div>
          )}

          {/* Price & Book Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <div className="flex items-center gap-1">
                <FiDollarSign className="w-4 h-4 text-gray-600" />
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(price)}
                </span>
              </div>
              <span className="text-xs text-gray-500">per {priceUnit}</span>
            </div>
            <Button variant="primary" size="sm">
              Book Now
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

ParkingSpaceCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  distance: PropTypes.number,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.oneOf(['hour', 'day', 'week', 'month']),
  rating: PropTypes.number,
  reviewCount: PropTypes.number,
  imageUrl: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  availability: PropTypes.oneOf(['available', 'limited', 'unavailable']),
  features: PropTypes.arrayOf(PropTypes.string),
  propertyType: PropTypes.string,
  spaceType: PropTypes.string,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
  className: PropTypes.string,
};

export default ParkingSpaceCard;
