import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'booking', label: 'Booking & Payment' },
    { id: 'property-owners', label: 'For Property Owners' },
    { id: 'account', label: 'Account & Security' },
    { id: 'technical', label: 'Technical Support' }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with ParkingBnB?',
      answer: 'Getting started is easy! Simply sign up for a free account, complete your profile, add your vehicle information, and you\'re ready to search and book parking spaces. The entire process takes less than 5 minutes.'
    },
    {
      category: 'getting-started',
      question: 'Do I need to verify my account?',
      answer: 'Yes, for security purposes, you\'ll need to verify your email address after signing up. Some features may also require phone verification. Property owners need to complete additional verification including ID and property ownership documents.'
    },
    {
      category: 'booking',
      question: 'How do I book a parking space?',
      answer: 'Search for parking spaces in your desired location, select your preferred space, choose your date and time, review the details and pricing, and confirm your booking. You\'ll receive a confirmation email with all the details and a QR code for check-in.'
    },
    {
      category: 'booking',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), debit cards, and digital wallets. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      category: 'booking',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking based on the cancellation policy of the specific parking space. Most spaces offer free cancellation up to 24 hours before the booking start time. Check the specific cancellation policy during booking.'
    },
    {
      category: 'booking',
      question: 'What if I need to extend my parking time?',
      answer: 'You can extend your parking time directly through the app if the space is available. Go to "My Bookings", select your active booking, and click "Extend". The additional time will be charged to your default payment method.'
    },
    {
      category: 'booking',
      question: 'How do I get a refund?',
      answer: 'Refunds are processed according to the cancellation policy. If eligible, refunds are automatically initiated to your original payment method within 3-5 business days. You can track refund status in your payment history.'
    },
    {
      category: 'property-owners',
      question: 'How can I list my parking space?',
      answer: 'Register as a property owner, complete the verification process, add your property details including location, photos, and amenities, set your pricing and availability, and submit for review. Once approved, your space will be live on the platform.'
    },
    {
      category: 'property-owners',
      question: 'How much can I earn?',
      answer: 'Earnings vary based on location, demand, and pricing. On average, owners earn $200-$500 per month per space. You can set your own rates and we provide pricing recommendations based on market data.'
    },
    {
      category: 'property-owners',
      question: 'When do I receive my payments?',
      answer: 'Payments are processed weekly and transferred to your linked bank account. You receive 85% of the booking amount, with 15% going to platform fees. All transactions are detailed in your earnings dashboard.'
    },
    {
      category: 'property-owners',
      question: 'What if there\'s damage to my property?',
      answer: 'All bookings are covered by our Host Protection Program. Report any damages within 24 hours of checkout, and our team will investigate and process claims. Most claims are resolved within 7 business days.'
    },
    {
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Go to Profile Settings > Security tab, enter your current password, then your new password twice, and click "Change Password". For security, we\'ll send a confirmation email to your registered email address.'
    },
    {
      category: 'account',
      question: 'Can I have multiple vehicles on my account?',
      answer: 'Yes! You can add unlimited vehicles to your account. Go to "My Vehicles", click "Add Vehicle", and fill in the details. You can set a default vehicle for faster booking.'
    },
    {
      category: 'account',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Profile Settings > Security, toggle on "Two-Factor Authentication", and follow the setup instructions. We recommend using an authenticator app for the most secure 2FA experience.'
    },
    {
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'Go to Profile Settings > Privacy tab, scroll to the bottom, and click "Delete My Account". Note: This action is permanent and cannot be undone. All your data will be permanently deleted within 30 days.'
    },
    {
      category: 'technical',
      question: 'The app is not working properly. What should I do?',
      answer: 'Try these steps: 1) Clear your browser cache and cookies, 2) Ensure you\'re using the latest version, 3) Try a different browser, 4) Check your internet connection. If the issue persists, contact our support team with details about the problem.'
    },
    {
      category: 'technical',
      question: 'I\'m not receiving email notifications',
      answer: 'Check your spam/junk folder first. Then verify your email address in Profile Settings and ensure email notifications are enabled in Preferences. Add noreply@parkingbnb.com to your contacts to prevent emails from going to spam.'
    },
    {
      category: 'technical',
      question: 'How do I report a bug or issue?',
      answer: 'Contact our support team via the Contact page or email support@parkingbnb.com with details about the issue, including what you were doing, error messages, and screenshots if possible. We aim to respond within 24 hours.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaQuestionCircle className="text-6xl mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Find answers to frequently asked questions or reach out to our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 -mt-6">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg shadow-lg border-2 border-transparent focus:border-primary-500 focus:ring-0 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                No questions found matching your search. Try different keywords or{' '}
                <Link to="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                  contact us
                </Link>{' '}
                directly.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    {openFAQ === index ? (
                      <FaChevronUp className="text-primary-600 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {filteredFAQs.length > 0 && (
            <p className="text-center text-gray-600 mt-8">
              Showing {filteredFAQs.length} of {faqs.length} questions
            </p>
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@parkingbnb.com"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
