import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchBar = ({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = 'Search...',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const sizeClasses = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const searchBarClasses = clsx(
    'relative flex items-center rounded-lg border transition-all duration-200',
    sizeClasses[size],
    {
      'border-primary-500 ring-2 ring-primary-500/20': isFocused,
      'border-gray-300': !isFocused,
      'opacity-50 cursor-not-allowed': disabled,
      'w-full': fullWidth,
      'w-64': !fullWidth,
    },
    className
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={searchBarClasses}>
      <div className="flex items-center pl-3">
        {loading ? (
          <div
            className={clsx(
              'animate-spin rounded-full border-2 border-gray-300 border-t-primary-600',
              iconSizeClasses[size]
            )}
          />
        ) : (
          <FiSearch className={clsx('text-gray-400', iconSizeClasses[size])} />
        )}
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'flex-1 px-3 bg-transparent outline-none',
          'placeholder:text-gray-400 text-gray-900',
          'disabled:cursor-not-allowed'
        )}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
          aria-label="Clear search"
        >
          <FiX className={iconSizeClasses[size]} />
        </button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
};

export default SearchBar;
