import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { FiMenu, FiX, FiBell, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { Avatar, Badge, Dropdown, DropdownItem, DropdownDivider } from '@components/common';

const Header = ({ user, onLogout, notifications = [] }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = user
    ? [
        { name: 'Dashboard', href: `/${user.role}/dashboard`, roles: ['user', 'owner', 'admin'] },
        { name: 'Bookings', href: `/${user.role}/bookings`, roles: ['user'] },
        { name: 'Properties', href: '/owner/properties', roles: ['owner'] },
        { name: 'Analytics', href: `/${user.role}/analytics`, roles: ['owner', 'admin'] },
      ].filter((link) => link.roles.includes(user.role))
    : [
        { name: 'Home', href: '/' },
        { name: 'Find Parking', href: '/search' },
        { name: 'List Your Space', href: '/become-owner' },
        { name: 'About', href: '/about' },
      ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ParkingBnB</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Notifications */}
                <Dropdown
                  trigger={
                    <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <FiBell className="h-6 w-6" />
                      {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  }
                  position="bottom-right"
                >
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-sm text-gray-500 text-center">
                        No notifications
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={clsx('p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100', {
                            'bg-blue-50': !notification.read,
                          })}
                        >
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <Link
                      to={`/${user.role}/notifications`}
                      className="block text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2"
                    >
                      View all notifications
                    </Link>
                  </div>
                </Dropdown>

                {/* User Menu */}
                <Dropdown
                  trigger={
                    <button className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors">
                      <Avatar
                        src={user.profileImage}
                        name={user.name}
                        size="sm"
                        status={user.status}
                      />
                      <span className="hidden lg:block text-sm font-medium text-gray-700">
                        {user.name}
                      </span>
                    </button>
                  }
                  position="bottom-right"
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <Badge variant="primary" size="sm" className="mt-2">
                      {user.role}
                    </Badge>
                  </div>
                  <DropdownItem
                    icon={<FiUser />}
                    onClick={() => (window.location.href = `/${user.role}/profile`)}
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    icon={<FiSettings />}
                    onClick={() => (window.location.href = `/${user.role}/settings`)}
                  >
                    Settings
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem icon={<FiLogOut />} onClick={onLogout} danger>
                    Logout
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['user', 'owner', 'admin']).isRequired,
    profileImage: PropTypes.string,
    status: PropTypes.oneOf(['online', 'offline', 'away', 'busy']),
  }),
  onLogout: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      read: PropTypes.bool,
    })
  ),
};

export default Header;
