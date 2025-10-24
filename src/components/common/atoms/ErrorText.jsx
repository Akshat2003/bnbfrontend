import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorText = ({
  children,
  showIcon = true,
  size = 'sm',
  className = '',
}) => {
  if (!children) return null;

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
  };

  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 16,
  };

  return (
    <p
      className={clsx(
        'flex items-start gap-1 text-red-600 mt-1',
        sizeClasses[size],
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {showIcon && (
        <FiAlertCircle
          className="flex-shrink-0 mt-0.5"
          size={iconSizes[size]}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </p>
  );
};

ErrorText.propTypes = {
  children: PropTypes.node,
  showIcon: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md']),
  className: PropTypes.string,
};

export default ErrorText;
