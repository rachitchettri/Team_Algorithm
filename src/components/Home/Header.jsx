import { useState } from 'react';
import { FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import ChatApp from '../Chat/ChatApp';
import logoImage from '../../assets/images/logo.png';

const Header = ({ searchQuery, setSearchQuery, setShowMobileMenu }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <img 
            src={logoImage} 
            alt="Company Logo" 
            className="h-40 w-auto md:h-18" // Responsive logo sizing
          />
        </div>

        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-gray-100"
          onClick={() => setShowMobileMenu(true)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 relative">
          <button className="p-2 xl:p-3 rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-purple-300">
            <FiBell className="text-lg xl:text-xl text-gray-600" />
            <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
          </button>

          <div className="relative">
            <button
              className="p-2 xl:p-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <FiMessageSquare className="text-lg xl:text-xl text-gray-600" />
            </button>

            {isChatOpen && (
              <div className="absolute right-0 mt-2 w-80 xl:w-96 z-50 shadow-xl rounded-lg overflow-hidden">
                <ChatApp />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 xl:space-x-3 cursor-pointer group">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="h-8 w-8 xl:h-10 xl:w-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-purple-500 transition"
            />
            <span className="font-medium text-sm xl:text-base text-gray-700 group-hover:text-purple-600 transition">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;