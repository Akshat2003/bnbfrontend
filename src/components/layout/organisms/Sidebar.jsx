import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  FiHome,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiSettings,
  FiUsers,
  FiBarChart2,
  FiMessageSquare,
  FiFileText,
  FiCreditCard,
} from 'react-icons/fi';

const Sidebar = ({ role, isCollapsed = false }) => {
  const location = useLocation();

  const menuItems = {
    user: [
      { icon: FiHome, label: 'Dashboard', href: '/user/dashboard' },
      { icon: FiMapPin, label: 'Find Parking', href: '/user/search' },
      { icon: FiCalendar, label: 'My Bookings', href: '/user/bookings' },
      { icon: FiCreditCard, label: 'Payment Methods', href: '/user/payment-methods' },
      { icon: FiMessageSquare, label: 'Messages', href: '/user/messages' },
      { icon: FiFileText, label: 'Reviews', href: '/user/reviews' },
      { icon: FiSettings, label: 'Settings', href: '/user/settings' },
    ],
    owner: [
      { icon: FiHome, label: 'Dashboard', href: '/owner/dashboard' },
      { icon: FiMapPin, label: 'My Properties', href: '/owner/properties' },
      { icon: FiCalendar, label: 'Bookings', href: '/owner/bookings' },
      { icon: FiDollarSign, label: 'Earnings', href: '/owner/earnings' },
      { icon: FiBarChart2, label: 'Analytics', href: '/owner/analytics' },
      { icon: FiMessageSquare, label: 'Messages', href: '/owner/messages' },
      { icon: FiFileText, label: 'Reviews', href: '/owner/reviews' },
      { icon: FiSettings, label: 'Settings', href: '/owner/settings' },
    ],
    admin: [
      { icon: FiHome, label: 'Dashboard', href: '/admin/dashboard' },
      { icon: FiUsers, label: 'Users', href: '/admin/users' },
      { icon: FiMapPin, label: 'Properties', href: '/admin/properties' },
      { icon: FiCalendar, label: 'Bookings', href: '/admin/bookings' },
      { icon: FiDollarSign, label: 'Payments', href: '/admin/payments' },
      { icon: FiBarChart2, label: 'Analytics', href: '/admin/analytics' },
      { icon: FiMessageSquare, label: 'Support', href: '/admin/support' },
      { icon: FiFileText, label: 'Reports', href: '/admin/reports' },
      { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
    ],
  };

  const items = menuItems[role] || [];

  const isActive = (href) => location.pathname === href;

  return (
    <aside
      className={clsx(
        'bg-white border-r border-gray-200 h-full transition-all duration-300',
        {
          'w-64': !isCollapsed,
          'w-20': isCollapsed,
        }
      )}
    >
      <nav className="p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              to={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                {
                  'bg-primary-50 text-primary-700 font-medium': active,
                  'text-gray-700 hover:bg-gray-50': !active,
                  'justify-center': isCollapsed,
                }
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={clsx('h-5 w-5 flex-shrink-0', {
                  'text-primary-600': active,
                  'text-gray-500': !active,
                })}
              />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  role: PropTypes.oneOf(['user', 'owner', 'admin']).isRequired,
  isCollapsed: PropTypes.bool,
};

export default Sidebar;
