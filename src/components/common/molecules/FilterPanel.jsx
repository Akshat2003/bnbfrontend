import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiX, FiSliders } from 'react-icons/fi';
import { Button, Select, Checkbox, Card } from '@components/common';

const FilterPanel = ({
  filters,
  onFiltersChange,
  onReset,
  isMobile = false,
  isOpen = true,
  onClose,
  className = ''
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'outdoor', label: 'Outdoor' },
  ];

  const spaceTypes = [
    { value: 'all', label: 'All Spaces' },
    { value: 'garage', label: 'Garage' },
    { value: 'driveway', label: 'Driveway' },
    { value: 'parking_lot', label: 'Parking Lot' },
    { value: 'street', label: 'Street Parking' },
  ];

  const featureOptions = [
    { id: 'covered', label: 'Covered' },
    { id: 'ev_charging', label: 'EV Charging' },
    { id: 'security', label: 'Security Camera' },
    { id: '24/7', label: '24/7 Access' },
    { id: 'accessible', label: 'Wheelchair Accessible' },
    { id: 'oversized', label: 'Oversized Vehicles' },
  ];

  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'distance', label: 'Nearest First' },
  ];

  const handleFilterChange = (key, value) => {
    const updated = { ...localFilters, [key]: value };
    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const handleFeatureToggle = (featureId) => {
    const currentFeatures = localFilters.features || [];
    const updated = currentFeatures.includes(featureId)
      ? currentFeatures.filter((f) => f !== featureId)
      : [...currentFeatures, featureId];

    handleFilterChange('features', updated);
  };

  const handlePriceChange = (index, value) => {
    const updated = [...localFilters.priceRange];
    updated[index] = Number(value);
    handleFilterChange('priceRange', updated);
  };

  const handleReset = () => {
    const defaultFilters = {
      propertyType: 'all',
      spaceType: 'all',
      features: [],
      priceRange: [0, 1000],
      sortBy: 'recommended',
    };
    setLocalFilters(defaultFilters);
    if (onReset) {
      onReset(defaultFilters);
    }
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiSliders className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {isMobile && onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-gray-900"
            aria-label="Close filters"
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Type
        </label>
        <Select
          value={localFilters.propertyType}
          onChange={(e) => handleFilterChange('propertyType', e.target.value)}
          options={propertyTypes}
        />
      </div>

      {/* Space Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Space Type
        </label>
        <Select
          value={localFilters.spaceType}
          onChange={(e) => handleFilterChange('spaceType', e.target.value)}
          options={spaceTypes}
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (per hour)
        </label>
        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              max={localFilters.priceRange[1]}
              value={localFilters.priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min"
            />
            <span className="flex items-center text-gray-500">-</span>
            <input
              type="number"
              min={localFilters.priceRange[0]}
              max="1000"
              value={localFilters.priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000"
            value={localFilters.priceRange[1]}
            onChange={(e) => handlePriceChange(1, e.target.value)}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>${localFilters.priceRange[0]}</span>
            <span>${localFilters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Features
        </label>
        <div className="space-y-2">
          {featureOptions.map((feature) => (
            <Checkbox
              key={feature.id}
              label={feature.label}
              checked={(localFilters.features || []).includes(feature.id)}
              onChange={() => handleFeatureToggle(feature.id)}
            />
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <Select
          value={localFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          options={sortOptions}
        />
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        fullWidth
        onClick={handleReset}
      >
        Reset Filters
      </Button>
    </div>
  );

  // Mobile: render in a modal/drawer style
  if (isMobile) {
    return (
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-black/50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          className
        )}
        onClick={onClose}
      >
        <div
          className={clsx(
            'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl transition-transform',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full overflow-y-auto p-6">
            {content}
          </div>
        </div>
      </div>
    );
  }

  // Desktop: render as sidebar
  return (
    <Card className={clsx('sticky top-6', className)} padding="lg">
      {content}
    </Card>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    propertyType: PropTypes.string,
    spaceType: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    priceRange: PropTypes.arrayOf(PropTypes.number),
    sortBy: PropTypes.string,
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default FilterPanel;
