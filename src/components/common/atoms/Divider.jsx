import PropTypes from 'prop-types';
import clsx from 'clsx';

const Divider = ({
  orientation = 'horizontal',
  spacing = 'md',
  thickness = 'thin',
  color = 'gray',
  label = null,
  className = '',
}) => {
  const spacingClasses = {
    horizontal: {
      none: 'my-0',
      sm: 'my-2',
      md: 'my-4',
      lg: 'my-6',
      xl: 'my-8',
    },
    vertical: {
      none: 'mx-0',
      sm: 'mx-2',
      md: 'mx-4',
      lg: 'mx-6',
      xl: 'mx-8',
    },
  };

  const thicknessClasses = {
    horizontal: {
      thin: 'border-t',
      medium: 'border-t-2',
      thick: 'border-t-4',
    },
    vertical: {
      thin: 'border-l',
      medium: 'border-l-2',
      thick: 'border-l-4',
    },
  };

  const colorClasses = {
    gray: 'border-gray-200',
    primary: 'border-blue-500',
    secondary: 'border-gray-400',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={clsx(
          'inline-block h-full',
          thicknessClasses.vertical[thickness],
          colorClasses[color],
          spacingClasses.vertical[spacing],
          className
        )}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  // Horizontal divider with optional label
  if (label) {
    return (
      <div
        className={clsx(
          'flex items-center',
          spacingClasses.horizontal[spacing],
          className
        )}
        role="separator"
        aria-label={typeof label === 'string' ? label : undefined}
      >
        <div
          className={clsx(
            'flex-1',
            thicknessClasses.horizontal[thickness],
            colorClasses[color]
          )}
        />
        <span className="px-3 text-sm text-gray-500 font-medium">{label}</span>
        <div
          className={clsx(
            'flex-1',
            thicknessClasses.horizontal[thickness],
            colorClasses[color]
          )}
        />
      </div>
    );
  }

  // Simple horizontal divider
  return (
    <hr
      className={clsx(
        thicknessClasses.horizontal[thickness],
        colorClasses[color],
        spacingClasses.horizontal[spacing],
        className
      )}
      role="separator"
    />
  );
};

Divider.propTypes = {
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  spacing: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  thickness: PropTypes.oneOf(['thin', 'medium', 'thick']),
  color: PropTypes.oneOf(['gray', 'primary', 'secondary', 'success', 'danger', 'warning']),
  label: PropTypes.node,
  className: PropTypes.string,
};

export default Divider;
