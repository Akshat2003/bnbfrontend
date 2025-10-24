import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Radio = forwardRef(
  (
    {
      label,
      name,
      value,
      checked = false,
      onChange,
      disabled = false,
      error,
      size = 'md',
      className = '',
      ...rest
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const dotSizeClasses = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    };

    const radioClasses = clsx(
      'rounded-full transition-all duration-200 cursor-pointer',
      'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      'flex items-center justify-center',
      sizeClasses[size],
      {
        'border-gray-300 bg-white': !checked && !error,
        'border-primary-600 bg-white': checked && !error,
        'border-red-500': error && !checked,
        'border-red-500 bg-white': error && checked,
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );

    const labelClasses = clsx('text-sm font-medium', {
      'text-gray-700': !error,
      'text-red-600': error,
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    });

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            id={`${name}-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            className="sr-only"
            {...rest}
          />
          <label htmlFor={`${name}-${value}`} className={radioClasses}>
            {checked && (
              <span
                className={clsx(
                  'rounded-full transition-all duration-200',
                  dotSizeClasses[size],
                  {
                    'bg-primary-600': !error,
                    'bg-red-500': error,
                  }
                )}
              />
            )}
          </label>
        </div>
        {label && (
          <label htmlFor={`${name}-${value}`} className={clsx(labelClasses, 'ml-2')}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

Radio.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Radio;
