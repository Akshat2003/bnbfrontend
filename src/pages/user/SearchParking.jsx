import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SearchBar,
  FilterPanel,
  ParkingSpaceCard,
  Spinner,
  Alert,
  Pagination,
  Button
} from '@components/common';
import { FiMap, FiList, FiSliders } from 'react-icons/fi';
import { useBooking } from '@context/BookingContext';
import parkingSpaceService from '@services/parkingSpaceService';

const SearchParking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchFilters, updateFilters, searchResults, isSearching } = useBooking();

  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 12;

  // Get location from URL params
  const locationParam = searchParams.get('location');
  const checkInParam = searchParams.get('checkIn');
  const checkOutParam = searchParams.get('checkOut');

  useEffect(() => {
    // Update filters from URL params
    if (locationParam) {
      updateFilters({ location: locationParam });
    }
    if (checkInParam) {
      updateFilters({ checkIn: new Date(checkInParam) });
    }
    if (checkOutParam) {
      updateFilters({ checkOut: new Date(checkOutParam) });
    }
  }, [locationParam, checkInParam, checkOutParam]);

  useEffect(() => {
    fetchParkingSpaces();
  }, [searchFilters, currentPage]);

  const fetchParkingSpaces = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await parkingSpaceService.searchSpaces({
        ...searchFilters,
        page: currentPage,
        limit: resultsPerPage,
      });

      if (result.success) {
        setResults(result.data.spaces || []);
        setTotalPages(Math.ceil((result.data.total || 0) / resultsPerPage));
      } else {
        setError(result.error || 'Failed to fetch parking spaces');
        setResults([]);
      }
    } catch (err) {
      setError('An error occurred while searching');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchData) => {
    updateFilters(searchData);
    setCurrentPage(1);

    // Update URL params
    const params = new URLSearchParams();
    if (searchData.location) params.set('location', searchData.location);
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn.toISOString());
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut.toISOString());
    setSearchParams(params);
  };

  const handleFiltersChange = (newFilters) => {
    updateFilters(newFilters);
    setCurrentPage(1);
  };

  const handleFavoriteToggle = async (spaceId, isFavorited) => {
    // TODO: Implement favorite toggle API call
    console.log('Toggle favorite:', spaceId, isFavorited);
  };

  // Mock data for development (remove when API is ready)
  const mockResults = [
    {
      id: 1,
      title: 'Modern Covered Garage',
      address: '123 Main St',
      city: 'San Francisco',
      distance: 0.5,
      price: 8,
      priceUnit: 'hour',
      rating: 4.8,
      reviewCount: 45,
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af"%3EGarage%3C/text%3E%3C/svg%3E',
      availability: 'available',
      features: ['covered', 'security', '24/7'],
      propertyType: 'residential',
      spaceType: 'garage',
    },
    {
      id: 2,
      title: 'Downtown Parking Lot',
      address: '456 Market St',
      city: 'San Francisco',
      distance: 1.2,
      price: 12,
      priceUnit: 'hour',
      rating: 4.5,
      reviewCount: 32,
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23dbeafe"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%233b82f6"%3EParking Lot%3C/text%3E%3C/svg%3E',
      availability: 'available',
      features: ['ev_charging', 'security'],
      propertyType: 'commercial',
      spaceType: 'parking_lot',
    },
    {
      id: 3,
      title: 'Convenient Driveway',
      address: '789 Oak Ave',
      city: 'San Francisco',
      distance: 0.8,
      price: 5,
      priceUnit: 'hour',
      rating: 4.9,
      reviewCount: 78,
      imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23dcfce7"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%2316a34a"%3EDriveway%3C/text%3E%3C/svg%3E',
      availability: 'limited',
      features: ['covered'],
      propertyType: 'residential',
      spaceType: 'driveway',
    },
  ];

  const displayResults = results.length > 0 ? results : mockResults;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar
            initialLocation={searchFilters.location}
            initialCheckIn={searchFilters.checkIn}
            initialCheckOut={searchFilters.checkOut}
            onSearch={handleSearch}
            size="md"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              filters={searchFilters}
              onFiltersChange={handleFiltersChange}
              onReset={handleFiltersChange}
            />
          </div>

          {/* Results Section */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchFilters.location || 'All Locations'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching...' : `${displayResults.length} parking spaces available`}
                </p>
              </div>

              {/* View Toggle & Mobile Filter */}
              <div className="flex gap-2">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  size="md"
                  icon={<FiSliders />}
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden"
                >
                  Filters
                </Button>

                {/* View Mode Toggle */}
                <div className="hidden md:flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                    List
                  </button>
                  <button
                    onClick={() => setViewMode('map')}
                    className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                      viewMode === 'map'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <FiMap className="w-4 h-4" />
                    Map
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <Alert variant="danger" className="mb-6">
                {error}
              </Alert>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" color="primary" />
              </div>
            )}

            {/* Results Grid */}
            {!loading && displayResults.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {displayResults.map((space) => (
                    <ParkingSpaceCard
                      key={space.id}
                      {...space}
                      onFavoriteToggle={handleFavoriteToggle}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}

            {/* No Results */}
            {!loading && displayResults.length === 0 && !error && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-600 mb-2">No parking spaces found</p>
                <p className="text-gray-500">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <FilterPanel
        filters={searchFilters}
        onFiltersChange={handleFiltersChange}
        onReset={handleFiltersChange}
        isMobile={true}
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </div>
  );
};

export default SearchParking;
