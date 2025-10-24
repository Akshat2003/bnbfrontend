import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiShield, FiClock, FiSearch, FiArrowRight } from 'react-icons/fi';
import { Button, Card, Badge } from '@components/common';

const Landing = () => {
  const features = [
    {
      icon: FiMapPin,
      title: 'Find Parking Anywhere',
      description: 'Discover available parking spaces in your neighborhood or destination.',
    },
    {
      icon: FiDollarSign,
      title: 'Affordable Rates',
      description: 'Save money with competitive prices and transparent pricing.',
    },
    {
      icon: FiShield,
      title: 'Safe & Secure',
      description: 'Verified parking spaces with insurance coverage and 24/7 support.',
    },
    {
      icon: FiClock,
      title: 'Book Instantly',
      description: 'Reserve parking in seconds with real-time availability.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Parking Spaces' },
    { value: '50,000+', label: 'Happy Users' },
    { value: '100+', label: 'Cities' },
    { value: '4.8★', label: 'Average Rating' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="primary" className="mb-6 bg-white/20 text-white">
              The Future of Parking
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Find & Book Parking Spaces Instantly
            </h1>
            <p className="text-xl lg:text-2xl text-primary-100 mb-8">
              Join thousands of drivers finding convenient parking. Save time, save money.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/search">
                <Button size="lg" variant="primary" className="bg-white text-primary-600 hover:bg-gray-100 w-full sm:w-auto">
                  <FiSearch className="mr-2" />
                  Find Parking Now
                </Button>
              </Link>
              <Link to="/become-owner">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  List Your Space
                  <FiArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Search Bar Preview */}
            <div className="mt-12 bg-white rounded-xl shadow-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Where do you need parking?"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <input
                  type="date"
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Link to="/search">
                  <Button variant="primary" size="lg" className="w-full md:w-auto">
                    Search
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ParkingBnB?
            </h2>
            <p className="text-xl text-gray-600">
              The smartest way to find and book parking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} padding="lg" shadow="md" hoverable>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Book parking in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Search', desc: 'Enter your location and dates' },
              { step: '2', title: 'Book', desc: 'Choose from available spaces' },
              { step: '3', title: 'Park', desc: 'Get directions and park with ease' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary-600 text-white text-2xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have made parking hassle-free. Sign up now and get your first booking discount!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Sign Up Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
