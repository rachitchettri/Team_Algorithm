// 
import { Outlet } from 'react-router-dom';
import Header from '../Home/Header';
import LeftSidebar from '../Home/LeftSidebar';
import { useState } from 'react';

const MainLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        setShowMobileMenu={setShowMobileMenu} 
      />

      {/* Main Content */}
      <div className="flex flex-1 justify-center px-4 md:px-6 lg:px-8">
        <div className="flex w-full max-w-7xl">
          {/* Left Sidebar */}
          <div className="hidden md:block w-64">
            <LeftSidebar />
          </div>

          {/* Page Content */}
          <main className="flex-1 p-2 md:p-2 overflow-y-auto rounded-lg">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
