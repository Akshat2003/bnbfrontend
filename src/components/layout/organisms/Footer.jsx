import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How It Works', href: '/how-it-works' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Safety Center', href: '/safety' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Trust & Safety', href: '/trust' },
    ],
    host: [
      { name: 'List Your Space', href: '/become-owner' },
      { name: 'Host Resources', href: '/host-resources' },
      { name: 'Community Forum', href: '/forum' },
      { name: 'Host Insurance', href: '/insurance' },
      { name: 'Pricing', href: '/pricing' },
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Refund Policy', href: '/refunds' },
      { name: 'Disclaimer', href: '/disclaimer' },
    ],
  };

  const socialLinks = [
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-xl font-bold text-white">ParkingBnB</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Find and book parking spaces anywhere, anytime. Safe, convenient, and affordable.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Host</h3>
            <ul className="space-y-2">
              {footerLinks.host.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <FiMail className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Email</p>
                <a href="mailto:support@parkingbnb.com" className="text-sm hover:text-primary-400">
                  support@parkingbnb.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiPhone className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Phone</p>
                <a href="tel:+1234567890" className="text-sm hover:text-primary-400">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMapPin className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">Address</p>
                <p className="text-sm">123 Parking Street, City, ST 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} ParkingBnB. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/sitemap" className="text-sm hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
              <Link to="/accessibility" className="text-sm hover:text-primary-400 transition-colors">
                Accessibility
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Made with</span>
                <span className="text-red-500">❤</span>
                <span className="text-sm text-gray-400">by ParkingBnB Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
