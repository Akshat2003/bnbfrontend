import { FaParking, FaUsers, FaShieldAlt, FaChartLine, FaHeart, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: 'Active Users', value: '50,000+', icon: <FaUsers /> },
    { label: 'Parking Spaces', value: '10,000+', icon: <FaParking /> },
    { label: 'Cities Covered', value: '100+', icon: <FaChartLine /> },
    { label: 'Happy Customers', value: '98%', icon: <FaHeart /> }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-4xl text-primary-600" />,
      title: 'Trust & Safety',
      description: 'We verify all property owners and implement robust security measures to ensure your peace of mind.'
    },
    {
      icon: <FaUsers className="text-4xl text-primary-600" />,
      title: 'Community First',
      description: 'Building a community of responsible parkers and property owners who value mutual respect and convenience.'
    },
    {
      icon: <FaChartLine className="text-4xl text-primary-600" />,
      title: 'Innovation',
      description: 'Leveraging technology to make parking simple, efficient, and accessible for everyone, everywhere.'
    },
    {
      icon: <FaLeaf className="text-4xl text-primary-600" />,
      title: 'Sustainability',
      description: 'Reducing urban congestion and carbon emissions by optimizing parking space utilization.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: null,
      bio: 'Former urban planning expert with 15 years of experience in smart city solutions.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: null,
      bio: 'Tech innovator passionate about solving real-world problems with elegant technology.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: null,
      bio: 'Operations specialist ensuring seamless experiences for our users and partners.'
    },
    {
      name: 'David Kim',
      role: 'Head of Customer Success',
      image: null,
      bio: 'Dedicated to making every customer interaction exceptional and meaningful.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About ParkingBnB
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
              Revolutionizing urban parking by connecting drivers with property owners who have unused parking spaces.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-4">
                At ParkingBnB, we believe that finding parking shouldn't be a stressful experience.
                We're on a mission to make parking simple, affordable, and accessible for everyone.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                By connecting drivers with property owners who have unused parking spaces, we're creating
                a win-win solution that reduces urban congestion, maximizes resource utilization, and
                provides income opportunities for property owners.
              </p>
              <p className="text-lg text-gray-700">
                Founded in 2024, we've quickly grown to become a trusted platform serving thousands of
                users across major cities, making every parking experience seamless and stress-free.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
              <FaParking className="text-9xl text-primary-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl text-primary-600 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            A diverse team of passionate individuals working together to transform urban parking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience Smart Parking?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have made parking stress-free with ParkingBnB.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-primary-700 text-white rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
