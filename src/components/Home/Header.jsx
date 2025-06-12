import { useState } from 'react';
import { FiSearch, FiBell, FiMessageSquare, FiBookOpen } from 'react-icons/fi';
import ChatApp from '../Chat/ChatApp';


const Header = ({ searchQuery, setSearchQuery, setShowMobileMenu }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
            <FiBookOpen className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Leap<span className="text-purple-600">&</span>Learn
          </h1>
        </div>

        <button
          className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-gray-100"
          onClick={() => setShowMobileMenu(true)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-6 relative">
          <button className="p-3 rounded-full hover:bg-gray-100 relative focus:outline-none focus:ring-2 focus:ring-purple-300">
            <FiBell className="text-xl text-gray-600" />
            <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
          </button>

          <div className="relative">
            <button
              className="p-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <FiMessageSquare className="text-xl text-gray-600" />
            </button>

            {isChatOpen && (
              <div className="absolute right-0 mt-3 w-96 z-50">
                <ChatApp />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 cursor-pointer group">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border-2 border-gray-300 group-hover:border-purple-500 transition"
            />
            <span className="font-medium text-gray-700 group-hover:text-purple-600 transition">
              John Doe
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;