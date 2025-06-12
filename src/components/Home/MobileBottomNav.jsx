import { FiUsers, FiBookOpen, FiBriefcase, FiUser } from 'react-icons/fi';

const MobileBottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'feed' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
        >
          <FiUsers className="text-2xl" />
          <span className="text-xs mt-1">Feed</span>
        </button>
        <button
          onClick={() => setActiveTab('learning')}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'learning' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
        >
          <FiBookOpen className="text-2xl" />
          <span className="text-xs mt-1">Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'jobs' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
        >
          <FiBriefcase className="text-2xl" />
          <span className="text-xs mt-1">Jobs</span>
        </button>
        <button
          onClick={() => setActiveTab('network')}
          className={`flex flex-col items-center p-2 rounded-lg ${activeTab === 'network' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-gray-600 hover:text-purple-700'}`}
        >
          <FiUsers className="text-2xl" />
          <span className="text-xs mt-1">Network</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-600 rounded-lg hover:text-purple-700">
          <FiUser className="text-2xl" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;