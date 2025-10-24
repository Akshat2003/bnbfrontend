import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Card, Alert } from '@components/common';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import authService from '@services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authService.forgotPassword(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <Card padding="lg">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>
              <Link to="/login">
                <Button variant="outline" fullWidth icon={<FiArrowLeft />} iconPosition="left">
                  Back to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <Alert variant="danger">{error}</Alert>}

              <Input
                type="email"
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<FiMail />}
              />

              <Button type="submit" variant="primary" fullWidth loading={loading}>
                Send Reset Link
              </Button>

              <div className="text-center">
                <Link to="/login" className="text-sm text-blue-600 hover:text-blue-700">
                  <span className="flex items-center justify-center gap-1">
                    <FiArrowLeft className="w-4 h-4" />
                    Back to Login
                  </span>
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
