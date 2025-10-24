import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiUser } from 'react-icons/fi';

const Avatar = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  rounded = 'full',
  status,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-2xl',
    '2xl': 'h-20 w-20 text-3xl',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  const statusSizeClasses = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  };

  const avatarClasses = clsx(
    'relative inline-flex items-center justify-center overflow-hidden bg-gray-200 text-gray-600',
    sizeClasses[size],
    roundedClasses[rounded],
    className
  );

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const renderContent = () => {
    if (src && !imageError) {
      return (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      );
    }

    if (name) {
      return (
        <span className="font-medium select-none">{getInitials(name)}</span>
      );
    }

    return <FiUser className="h-1/2 w-1/2" />;
  };

  return (
    <div className="relative inline-block">
      <div className={avatarClasses}>{renderContent()}</div>

      {status && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
            statusSizeClasses[size],
            statusColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  className: PropTypes.string,
};

export default Avatar;
