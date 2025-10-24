import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Card, Spinner } from '@components/common';
import { FiCheck, FiX } from 'react-icons/fi';
import authService from '@services/authService';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const result = await authService.verifyEmail(token);

      if (result.success) {
        setStatus('success');
        setMessage('Your email has been verified successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Verification failed. The link may have expired.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Verification</h1>
        </div>

        <Card padding="lg">
          <div className="text-center py-6">
            {status === 'verifying' && (
              <>
                <Spinner size="lg" color="primary" className="mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verifying...</h3>
                <p className="text-gray-600">Please wait while we verify your email address</p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Verified!</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <p className="text-sm text-gray-500">Redirecting to login page...</p>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiX className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Verification Failed</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <div className="space-y-3">
                  <Link to="/login">
                    <Button variant="primary" fullWidth>
                      Go to Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="outline" fullWidth>
                      Create New Account
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
