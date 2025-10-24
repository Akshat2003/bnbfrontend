import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Card = ({
  children,
  header,
  footer,
  variant = 'default',
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  hoverable = false,
  className = '',
}) => {
  const baseClasses = 'bg-white transition-all duration-200';

  const variantClasses = {
    default: 'border border-gray-200',
    outline: 'border-2 border-gray-300',
    elevated: 'border border-gray-100',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const shadowClasses = {
    none: 'shadow-none',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  const cardClasses = clsx(
    baseClasses,
    variantClasses[variant],
    shadowClasses[shadow],
    roundedClasses[rounded],
    {
      'hover:shadow-lg hover:-translate-y-0.5 cursor-pointer': hoverable,
    },
    className
  );

  const contentPaddingClasses = paddingClasses[padding];
  const headerFooterPaddingClasses = {
    none: 'px-0 py-0',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
    xl: 'px-8 py-5',
  };

  return (
    <div className={cardClasses}>
      {header && (
        <div
          className={clsx(
            'border-b border-gray-200',
            headerFooterPaddingClasses[padding]
          )}
        >
          {header}
        </div>
      )}

      <div className={contentPaddingClasses}>{children}</div>

      {footer && (
        <div
          className={clsx(
            'border-t border-gray-200',
            headerFooterPaddingClasses[padding]
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  footer: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outline', 'elevated']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', '2xl']),
  hoverable: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
