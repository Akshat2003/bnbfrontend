import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';

const Switch = forwardRef(
  (
    {
      label,
      name,
      checked = false,
      onChange,
      disabled = false,
      size = 'md',
      className = '',
      ...rest
    },
    ref
  ) => {
    const sizeClasses = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
      lg: {
        track: 'h-7 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
      },
    };

    const trackClasses = clsx(
      'relative inline-flex flex-shrink-0 cursor-pointer rounded-full',
      'border-2 border-transparent transition-colors duration-200 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
      sizeClasses[size].track,
      {
        'bg-primary-600': checked,
        'bg-gray-200': !checked,
        'opacity-50 cursor-not-allowed': disabled,
      },
      className
    );

    const thumbClasses = clsx(
      'pointer-events-none inline-block rounded-full bg-white shadow',
      'transform ring-0 transition-transform duration-200 ease-in-out',
      sizeClasses[size].thumb,
      {
        [sizeClasses[size].translate]: checked,
        'translate-x-0': !checked,
      }
    );

    const labelClasses = clsx('text-sm font-medium text-gray-700', {
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-pointer': !disabled,
    });

    return (
      <div className="flex items-center">
        <input
          ref={ref}
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          role="switch"
          aria-checked={checked}
          {...rest}
        />
        <label htmlFor={name} className={trackClasses}>
          <span aria-hidden="true" className={thumbClasses} />
        </label>
        {label && (
          <label htmlFor={name} className={clsx(labelClasses, 'ml-3')}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

Switch.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Switch;
