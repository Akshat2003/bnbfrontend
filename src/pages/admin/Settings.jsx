import { useState, useEffect } from 'react';
import Card from '@components/common/molecules/Card';
import Spinner from '@components/common/atoms/Spinner';
import {
  FaSave,
  FaCog,
  FaDollarSign,
  FaBell,
  FaShieldAlt,
  FaEnvelope,
  FaToggleOn,
  FaToggleOff
} from 'react-icons/fa';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        const mockSettings = {
          general: {
            siteName: 'ParkingBnB',
            supportEmail: 'support@parkingbnb.com',
            maintenanceMode: false,
            allowRegistration: true,
            requireEmailVerification: true
          },
          payment: {
            platformFeePercentage: 15,
            currency: 'USD',
            minBookingAmount: 5,
            maxBookingAmount: 10000,
            paymentMethods: {
              creditCard: true,
              paypal: true,
              applePay: false,
              googlePay: false
            }
          },
          notifications: {
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
            bookingConfirmation: true,
            paymentReceipt: true,
            propertyApproval: true,
            reviewReceived: true
          },
          security: {
            twoFactorAuth: true,
            sessionTimeout: 30,
            passwordMinLength: 8,
            requireStrongPassword: true,
            loginAttempts: 5,
            lockoutDuration: 15
          },
          email: {
            smtpHost: 'smtp.example.com',
            smtpPort: 587,
            smtpUsername: 'noreply@parkingbnb.com',
            smtpPassword: '••••••••',
            fromEmail: 'noreply@parkingbnb.com',
            fromName: 'ParkingBnB'
          }
        };

        setSettings(mockSettings);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      // TODO: Implement actual API call
      console.log('Saving settings:', settings);
      setHasChanges(false);
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSetting = (category, parent, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parent]: {
          ...prev[category][parent],
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'payment', label: 'Payment', icon: FaDollarSign },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'email', label: 'Email', icon: FaEnvelope }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FaSave className="w-4 h-4" />
            Save Changes
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => updateSetting('general', 'siteName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => updateSetting('general', 'supportEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Maintenance Mode</p>
                    <p className="text-sm text-gray-600">Temporarily disable public access</p>
                  </div>
                  <button
                    onClick={() => updateSetting('general', 'maintenanceMode', !settings.general.maintenanceMode)}
                    className="focus:outline-none"
                  >
                    {settings.general.maintenanceMode ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Allow Registration</p>
                    <p className="text-sm text-gray-600">Enable new user registration</p>
                  </div>
                  <button
                    onClick={() => updateSetting('general', 'allowRegistration', !settings.general.allowRegistration)}
                    className="focus:outline-none"
                  >
                    {settings.general.allowRegistration ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Email Verification Required</p>
                    <p className="text-sm text-gray-600">Require email verification for new accounts</p>
                  </div>
                  <button
                    onClick={() => updateSetting('general', 'requireEmailVerification', !settings.general.requireEmailVerification)}
                    className="focus:outline-none"
                  >
                    {settings.general.requireEmailVerification ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === 'payment' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Fee (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={settings.payment.platformFeePercentage}
                    onChange={(e) => updateSetting('payment', 'platformFeePercentage', parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Fee charged on each booking</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={settings.payment.currency}
                    onChange={(e) => updateSetting('payment', 'currency', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Booking Amount
                    </label>
                    <input
                      type="number"
                      value={settings.payment.minBookingAmount}
                      onChange={(e) => updateSetting('payment', 'minBookingAmount', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Booking Amount
                    </label>
                    <input
                      type="number"
                      value={settings.payment.maxBookingAmount}
                      onChange={(e) => updateSetting('payment', 'maxBookingAmount', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {Object.entries(settings.payment.paymentMethods).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <button
                      onClick={() => updateNestedSetting('payment', 'paymentMethods', key, !value)}
                      className="focus:outline-none"
                    >
                      {value ? (
                        <FaToggleOn className="w-12 h-12 text-blue-600" />
                      ) : (
                        <FaToggleOff className="w-12 h-12 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Settings */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.emailNotifications ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Send notifications via SMS</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', 'smsNotifications', !settings.notifications.smsNotifications)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.smsNotifications ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Send push notifications</p>
                  </div>
                  <button
                    onClick={() => updateSetting('notifications', 'pushNotifications', !settings.notifications.pushNotifications)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.pushNotifications ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Types</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Booking Confirmation</p>
                  <button
                    onClick={() => updateSetting('notifications', 'bookingConfirmation', !settings.notifications.bookingConfirmation)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.bookingConfirmation ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Payment Receipt</p>
                  <button
                    onClick={() => updateSetting('notifications', 'paymentReceipt', !settings.notifications.paymentReceipt)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.paymentReceipt ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Property Approval</p>
                  <button
                    onClick={() => updateSetting('notifications', 'propertyApproval', !settings.notifications.propertyApproval)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.propertyApproval ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">Review Received</p>
                  <button
                    onClick={() => updateSetting('notifications', 'reviewReceived', !settings.notifications.reviewReceived)}
                    className="focus:outline-none"
                  >
                    {settings.notifications.reviewReceived ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Configuration</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                  </div>
                  <button
                    onClick={() => updateSetting('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                    className="focus:outline-none"
                  >
                    {settings.security.twoFactorAuth ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Min Length
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="32"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Require Strong Password</p>
                    <p className="text-sm text-gray-600">Must include uppercase, lowercase, numbers, and symbols</p>
                  </div>
                  <button
                    onClick={() => updateSetting('security', 'requireStrongPassword', !settings.security.requireStrongPassword)}
                    className="focus:outline-none"
                  >
                    {settings.security.requireStrongPassword ? (
                      <FaToggleOn className="w-12 h-12 text-blue-600" />
                    ) : (
                      <FaToggleOff className="w-12 h-12 text-gray-400" />
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <input
                      type="number"
                      min="3"
                      max="10"
                      value={settings.security.loginAttempts}
                      onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lockout Duration (min)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={settings.security.lockoutDuration}
                      onChange={(e) => updateSetting('security', 'lockoutDuration', parseInt(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Email Settings */}
      {activeTab === 'email' && (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SMTP Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={settings.email.smtpHost}
                    onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) => updateSetting('email', 'smtpPort', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    value={settings.email.smtpUsername}
                    onChange={(e) => updateSetting('email', 'smtpUsername', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={settings.email.fromEmail}
                    onChange={(e) => updateSetting('email', 'fromEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={settings.email.fromName}
                    onChange={(e) => updateSetting('email', 'fromName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;
