import { useState, useEffect } from 'react';
import { FaUser, FaLock, FaCog, FaShieldAlt, FaCamera, FaSave } from 'react-icons/fa';
import Card from '@components/common/molecules/Card';
import Input from '@components/common/atoms/Input';
import Select from '@components/common/atoms/Select';
import Switch from '@components/common/atoms/Switch';
import Spinner from '@components/common/atoms/Spinner';
import { useAuth } from '@context/AuthContext';

const ProfileSettings = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    avatar: null
  });

  // Security State
  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    emailNotifications: true,
    bookingConfirmations: true,
    paymentReceipts: true,
    promotionalEmails: false,
    newsletter: false,
    smsNotifications: false,
    pushNotifications: true
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    dataSharing: false
  });

  const [errors, setErrors] = useState({});

  // Load user data
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        location: user.location || '',
        avatar: user.avatar || null
      });
    }
  }, [user]);

  // Tabs configuration
  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: <FaUser /> },
    { id: 'security', label: 'Security', icon: <FaLock /> },
    { id: 'preferences', label: 'Preferences', icon: <FaCog /> },
    { id: 'privacy', label: 'Privacy', icon: <FaShieldAlt /> }
  ];

  // Handle input change
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePreferencesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Upload to server and get URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonalInfo(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate personal info
  const validatePersonalInfo = () => {
    const newErrors = {};

    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (personalInfo.phone && !/^\+?[\d\s-()]+$/.test(personalInfo.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate password change
  const validatePasswordChange = () => {
    const newErrors = {};

    if (!securityInfo.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!securityInfo.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (securityInfo.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save personal info
  const handleSavePersonalInfo = async () => {
    if (!validatePersonalInfo()) return;

    setSaving(true);
    try {
      // TODO: API call to update user profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      // await userService.updateProfile(user.id, personalInfo);

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    if (!validatePasswordChange()) return;

    setSaving(true);
    try {
      // TODO: API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000));
      // await authService.changePassword(securityInfo.currentPassword, securityInfo.newPassword);

      alert('Password changed successfully!');
      setSecurityInfo({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        twoFactorEnabled: securityInfo.twoFactorEnabled
      });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    } finally {
      setSaving(false);
    }
  };

  // Save preferences
  const handleSavePreferences = async () => {
    setSaving(true);
    try {
      // TODO: API call to update preferences
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Preferences saved successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  // Save privacy settings
  const handleSavePrivacy = async () => {
    setSaving(true);
    try {
      // TODO: API call to update privacy settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Privacy settings saved successfully!');
    } catch (error) {
      console.error('Error saving privacy settings:', error);
      alert('Failed to save privacy settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="mt-2 text-gray-600">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Personal Information Tab */}
      {activeTab === 'personal' && (
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>

            {/* Avatar Upload */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {personalInfo.avatar ? (
                    <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-4xl text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700">
                  <FaCamera />
                  <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                </label>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Profile Picture</p>
                <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                value={personalInfo.firstName}
                onChange={handlePersonalInfoChange}
                error={errors.firstName}
                required
              />
              <Input
                label="Last Name"
                name="lastName"
                value={personalInfo.lastName}
                onChange={handlePersonalInfoChange}
                error={errors.lastName}
                required
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={personalInfo.email}
              onChange={handlePersonalInfoChange}
              error={errors.email}
              required
              disabled
              helperText="Email cannot be changed. Contact support if you need to update it."
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={personalInfo.phone}
              onChange={handlePersonalInfoChange}
              error={errors.phone}
              placeholder="+1 (555) 123-4567"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={personalInfo.dateOfBirth}
                onChange={handlePersonalInfoChange}
              />
              <Select
                label="Gender"
                name="gender"
                value={personalInfo.gender}
                onChange={handlePersonalInfoChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </Select>
            </div>

            <Input
              label="Location"
              name="location"
              value={personalInfo.location}
              onChange={handlePersonalInfoChange}
              placeholder="City, State, Country"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSavePersonalInfo}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
              >
                <FaSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>

              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={securityInfo.currentPassword}
                onChange={handleSecurityChange}
                error={errors.currentPassword}
                required
              />

              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={securityInfo.newPassword}
                onChange={handleSecurityChange}
                error={errors.newPassword}
                helperText="Must be at least 8 characters long"
                required
              />

              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={securityInfo.confirmPassword}
                onChange={handleSecurityChange}
                error={errors.confirmPassword}
                required
              />

              <div className="flex justify-end">
                <button
                  onClick={handleChangePassword}
                  disabled={saving}
                  className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
                >
                  <FaSave className="mr-2" />
                  {saving ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Two-Factor Authentication</h2>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-900">Enable 2FA</p>
                  <p className="text-sm text-gray-600">Require a verification code when signing in</p>
                </div>
                <Switch
                  checked={securityInfo.twoFactorEnabled}
                  onChange={(checked) => setSecurityInfo(prev => ({ ...prev, twoFactorEnabled: checked }))}
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preferences Tab */}
      {activeTab === 'preferences' && (
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Language"
                name="language"
                value={preferences.language}
                onChange={handlePreferencesChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </Select>

              <Select
                label="Currency"
                name="currency"
                value={preferences.currency}
                onChange={handlePreferencesChange}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </Select>
            </div>

            <Select
              label="Timezone"
              name="timezone"
              value={preferences.timezone}
              onChange={handlePreferencesChange}
            >
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="Europe/London">London (GMT)</option>
            </Select>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive all email notifications' },
                  { key: 'bookingConfirmations', label: 'Booking Confirmations', desc: 'Get notified when bookings are confirmed' },
                  { key: 'paymentReceipts', label: 'Payment Receipts', desc: 'Receive payment receipts via email' },
                  { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive special offers and promotions' },
                  { key: 'newsletter', label: 'Newsletter', desc: 'Subscribe to our monthly newsletter' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <Switch
                      checked={preferences[item.key]}
                      onChange={(checked) => setPreferences(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Other Notifications</h3>
              <div className="space-y-4">
                {[
                  { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive booking updates via SMS' },
                  { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get push notifications in your browser' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <Switch
                      checked={preferences[item.key]}
                      onChange={(checked) => setPreferences(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePreferences}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
              >
                <FaSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Preferences'}
              </button>
            </div>
          </div>
        </Card>
      )}

      {/* Privacy Tab */}
      {activeTab === 'privacy' && (
        <Card>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>

            <Select
              label="Profile Visibility"
              name="profileVisibility"
              value={privacy.profileVisibility}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public - Anyone can see your profile</option>
              <option value="private">Private - Only you can see your profile</option>
            </Select>

            <div className="space-y-4 border-t border-gray-200 pt-6">
              {[
                { key: 'showEmail', label: 'Show Email', desc: 'Display your email on your public profile' },
                { key: 'showPhone', label: 'Show Phone Number', desc: 'Display your phone number on your public profile' },
                { key: 'dataSharing', label: 'Data Sharing', desc: 'Allow sharing anonymized data for platform improvements' }
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch
                    checked={privacy[item.key]}
                    onChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-red-900 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                Delete My Account
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSavePrivacy}
                disabled={saving}
                className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
              >
                <FaSave className="mr-2" />
                {saving ? 'Saving...' : 'Save Privacy Settings'}
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProfileSettings;
