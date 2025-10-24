import React from 'react';
import PropTypes from 'prop-types';
import { clsx } from 'clsx';
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiAlertCircle, FiX } from 'react-icons/fi';

const Alert = ({
  children,
  title,
  variant = 'info',
  onClose,
  icon: customIcon,
  className = '',
}) => {
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: 'text-blue-600',
      IconComponent: FiInfo,
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-900',
      icon: 'text-green-600',
      IconComponent: FiCheckCircle,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: 'text-amber-600',
      IconComponent: FiAlertTriangle,
    },
    danger: {
      container: 'bg-red-50 border-red-200 text-red-900',
      icon: 'text-red-600',
      IconComponent: FiAlertCircle,
    },
  };

  const { container, icon, IconComponent } = variants[variant];
  const Icon = customIcon || IconComponent;

  const alertClasses = clsx(
    'relative p-4 rounded-lg border',
    'flex items-start gap-3',
    container,
    className
  );

  return (
    <div className={alertClasses} role="alert">
      <Icon className={clsx('h-5 w-5 flex-shrink-0 mt-0.5', icon)} />

      <div className="flex-1">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{children}</div>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={clsx(
            'flex-shrink-0 ml-2 p-0.5 rounded hover:bg-black/5 transition-colors',
            icon
          )}
          aria-label="Close alert"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
  onClose: PropTypes.func,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

export default Alert;
