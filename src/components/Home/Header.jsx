import { FiSearch, FiBell, FiMessageSquare, FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, searchQuery, setSearchQuery, setShowMobileMenu }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
            <FiBookOpen className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Leap<span className="text-purple-600">&</span>Learn
          </h1>
        </div>

        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 hover:bg-gray-100"
          onClick={() => setShowMobileMenu(true)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:block relative w-1/3">
          <input
            type="text"
            placeholder="Search for jobs, courses, people..."
            className="w-full py-2 px-5 pr-12 rounded-full bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <button className="p-3 rounded-full hover:bg-gray-100 relative transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
            <FiBell className="text-xl text-gray-600" />
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
          </button>
          <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
            <FiMessageSquare className="text-xl text-gray-600" />
          </button>

          {user && (
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/profile')}
            >
              <img
                src={user.avatar}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-purple-500 transition-all duration-200"
              />
              <span className="font-medium text-gray-700 group-hover:text-purple-600 transition-all duration-200">
                {user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
