import React from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Header from '@components/layout/organisms/Header';
import Footer from '@components/layout/organisms/Footer';
import { useAuth } from '@context/AuthContext';

const PublicLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header user={user} onLogout={logout} notifications={[]} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
