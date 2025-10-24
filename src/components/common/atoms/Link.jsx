import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Link = ({
  to,
  href,
  children,
  variant = 'default',
  size = 'md',
  underline = 'hover',
  external = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'text-blue-600 hover:text-blue-700',
    primary: 'text-blue-600 hover:text-blue-700 font-medium',
    secondary: 'text-gray-600 hover:text-gray-700',
    danger: 'text-red-600 hover:text-red-700',
    muted: 'text-gray-500 hover:text-gray-600',
  };

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const underlineClasses = {
    none: 'no-underline',
    hover: 'no-underline hover:underline',
    always: 'underline',
  };

  const baseClasses = clsx(
    'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-sm',
    variantClasses[variant],
    sizeClasses[size],
    underlineClasses[underline],
    {
      'opacity-50 cursor-not-allowed pointer-events-none': disabled,
    },
    className
  );

  // External link
  if (href || external) {
    return (
      <a
        href={href || to}
        className={baseClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        aria-disabled={disabled}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block" aria-label="Opens in new window">
            ↗
          </span>
        )}
      </a>
    );
  }

  // Internal React Router link
  return (
    <RouterLink
      to={to}
      className={baseClasses}
      aria-disabled={disabled}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger', 'muted']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  underline: PropTypes.oneOf(['none', 'hover', 'always']),
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Link;
