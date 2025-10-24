import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Badge,
  Card,
  ImageGallery,
  ReviewsList,
  Spinner,
  Alert,
  Avatar,
  Divider
} from '@components/common';
import {
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiStar,
  FiShield,
  FiZap,
  FiWifi,
  FiCamera,
  FiUsers,
  FiCheckCircle,
  FiMessageCircle,
  FiHeart,
  FiShare2,
  FiArrowLeft
} from 'react-icons/fi';
import { formatCurrency, formatDistance } from '@utils/formatters';
import parkingSpaceService from '@services/parkingSpaceService';
import { useBooking } from '@context/BookingContext';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await parkingSpaceService.getSpace(id);

      if (result.success) {
        setProperty(result.data);
      } else {
        setError(result.error || 'Failed to load property details');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for development
  const mockProperty = {
    id: 1,
    title: 'Modern Covered Garage in Downtown',
    description: 'Secure and convenient parking space in the heart of downtown. Perfect for daily commuters and visitors. The garage offers 24/7 access with security cameras and excellent lighting. Located just minutes away from major business districts and shopping centers.',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94102',
    distance: 0.5,
    price: 8,
    priceUnit: 'hour',
    dailyRate: 50,
    weeklyRate: 300,
    monthlyRate: 1000,
    rating: 4.8,
    reviewCount: 45,
    images: [
      'https://via.placeholder.com/800x600/4F46E5/ffffff?text=Garage+View+1',
      'https://via.placeholder.com/800x600/6366F1/ffffff?text=Garage+View+2',
      'https://via.placeholder.com/800x600/818CF8/ffffff?text=Garage+View+3',
      'https://via.placeholder.com/800x600/A5B4FC/ffffff?text=Garage+View+4',
      'https://via.placeholder.com/800x600/C7D2FE/ffffff?text=Garage+View+5',
    ],
    availability: 'available',
    propertyType: 'Residential',
    spaceType: 'Garage',
    dimensions: { width: 10, length: 20, height: 8 },
    features: [
      { icon: <FiShield />, name: 'Covered', available: true },
      { icon: <FiCamera />, name: 'Security Camera', available: true },
      { icon: <FiZap />, name: 'EV Charging', available: true },
      { icon: <FiClock />, name: '24/7 Access', available: true },
      { icon: <FiWifi />, name: 'WiFi', available: false },
      { icon: <FiUsers />, name: 'Valet Service', available: false },
    ],
    owner: {
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/100',
      memberSince: '2023-01-15',
      responseTime: '< 1 hour',
      responseRate: '100%',
      verifiedHost: true,
    },
    accessInstructions: 'Use code 1234 at the main gate. Your parking spot is #15 on the second level.',
    cancellationPolicy: 'Free cancellation up to 24 hours before start time. 50% refund for cancellations made less than 24 hours in advance.',
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Great location and very secure. The owner was responsive and helpful. Would definitely recommend!',
        createdAt: '2025-10-15T10:00:00Z',
        user: { name: 'Alice Johnson', avatar: 'https://via.placeholder.com/100' },
        helpfulCount: 12,
      },
      {
        id: 2,
        rating: 4,
        comment: 'Good parking space, easy access. Only downside is it can get a bit warm in summer.',
        createdAt: '2025-10-10T14:30:00Z',
        user: { name: 'Bob Smith', avatar: 'https://via.placeholder.com/100' },
        ownerReply: 'Thank you for your feedback! We\'re installing additional ventilation to address the temperature issue.',
        helpfulCount: 8,
      },
    ],
  };

  const displayProperty = property || mockProperty;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert variant="danger">{error}</Alert>
        <div className="text-center mt-6">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const handleBookNow = () => {
    startBooking(displayProperty);
    navigate('/dashboard/booking');
  };

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    // TODO: API call to save favorite
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: displayProperty.title,
        text: displayProperty.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <ImageGallery
              images={displayProperty.images}
              title={displayProperty.title}
            />

            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Badge>{displayProperty.propertyType}</Badge>
                    <Badge variant="secondary">{displayProperty.spaceType}</Badge>
                    {displayProperty.availability === 'available' && (
                      <Badge variant="success">Available Now</Badge>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {displayProperty.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiMapPin className="w-4 h-4" />
                      <span>
                        {displayProperty.address}, {displayProperty.city}, {displayProperty.state}
                      </span>
                    </div>
                    {displayProperty.distance && (
                      <span className="text-sm">
                        {formatDistance(displayProperty.distance)} away
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <FiStar className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{displayProperty.rating}</span>
                    <span className="text-gray-600">
                      ({displayProperty.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Share"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 rounded-lg transition-colors ${
                      isFavorited
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    aria-label="Favorite"
                  >
                    <FiHeart className={`w-5 h-5 ${isFavorited && 'fill-current'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {displayProperty.description}
                </p>
              </div>
            </Card>

            {/* Features */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {displayProperty.features.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 ${
                        feature.available ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {feature.available ? (
                        <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex-shrink-0" />
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{feature.icon}</span>
                        <span className="font-medium">{feature.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Space Details */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Space Details</h2>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {displayProperty.dimensions.width}ft
                    </p>
                    <p className="text-sm text-gray-600">Width</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {displayProperty.dimensions.length}ft
                    </p>
                    <p className="text-sm text-gray-600">Length</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {displayProperty.dimensions.height}ft
                    </p>
                    <p className="text-sm text-gray-600">Height</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Access Instructions */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Access Instructions</h2>
                <p className="text-gray-700">{displayProperty.accessInstructions}</p>
              </div>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Cancellation Policy</h2>
                <p className="text-gray-700">{displayProperty.cancellationPolicy}</p>
              </div>
            </Card>

            {/* Reviews */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Reviews</h2>
                <ReviewsList
                  reviews={displayProperty.reviews}
                  averageRating={displayProperty.rating}
                  totalReviews={displayProperty.reviewCount}
                />
              </div>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <div className="p-6 space-y-6">
                {/* Price */}
                <div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatCurrency(displayProperty.price)}
                    </span>
                    <span className="text-gray-600">/ {displayProperty.priceUnit}</span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{formatCurrency(displayProperty.dailyRate)} / day</p>
                    <p>{formatCurrency(displayProperty.weeklyRate)} / week</p>
                    <p>{formatCurrency(displayProperty.monthlyRate)} / month</p>
                  </div>
                </div>

                <Divider />

                {/* Book Now Button */}
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>

                {/* Owner Info */}
                <Divider />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Hosted by</h3>
                  <div className="flex items-start gap-3">
                    <Avatar
                      src={displayProperty.owner.avatar}
                      name={displayProperty.owner.name}
                      size="lg"
                      status={displayProperty.owner.verifiedHost ? 'online' : undefined}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">
                          {displayProperty.owner.name}
                        </p>
                        {displayProperty.owner.verifiedHost && (
                          <Badge variant="success" size="sm">
                            <FiCheckCircle className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Member since {new Date(displayProperty.owner.memberSince).getFullYear()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>Response time: {displayProperty.owner.responseTime}</p>
                    <p>Response rate: {displayProperty.owner.responseRate}</p>
                  </div>
                </div>

                {/* Contact Owner */}
                <Button
                  variant="outline"
                  fullWidth
                  icon={<FiMessageCircle />}
                  iconPosition="left"
                >
                  Contact Owner
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
