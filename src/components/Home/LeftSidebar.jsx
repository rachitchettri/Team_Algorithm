import { FiUsers, FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Card from './Card';

const LeftSidebar = ({ 
  activeTab, 
  setActiveTab, 
  upcomingEvents,
  handleAttendEvent 
}) => {
  const navigate = useNavigate();

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <Card className="p-6 mb-6 sticky top-24">
        <div className="flex items-center space-x-4 mb-5">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover border-3 border-purple-500 shadow-sm"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-800">John Doe</h3>
            <p className="text-sm text-gray-600">Web Developer</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-5">
          <p className="text-base text-gray-600 flex justify-between mb-2">
            <span>Profile completeness</span>
            <span className="font-semibold text-purple-600">75%</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <button 
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            onClick={() => navigate('/profile')}
          >
            Complete Profile
          </button>
        </div>
      </Card>

      <Card className="p-6 sticky top-[240px]">
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavigation('feed')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'feed' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
              >
                <FiUsers className="text-xl" />
                <span>My Feed</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('courses')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'learning' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
              >
                <FiBookOpen className="text-xl" />
                <span>Learning</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('recommended-jobs')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'jobs' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
              >
                <FiBriefcase className="text-xl" />
                <span>Jobs</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('network')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'network' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
              >
                <FiUsers className="text-xl" />
                <span>Network</span>
              </button>
            </li>
          </ul>
        </nav>
      </Card>

      <Card className="p-6 mt-6 sticky top-[500px]">
        <h3 className="font-bold text-gray-800 mb-4 text-lg">Upcoming Events</h3>
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <div key={event.id} className="border-l-4 border-purple-500 pl-4 py-2 bg-purple-50 rounded-r-lg">
              <h4 className="font-semibold text-gray-800">{event.title}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <span>{event.date} • {event.time}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                <span>{event.location}</span>
              </div>
              <button
                onClick={() => handleAttendEvent(event.id)}
                className={`mt-3 text-sm font-medium px-4 py-1.5 rounded-full ${event.attending ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'} transition-colors duration-200`}
              >
                {event.attending ? 'Cancel RSVP' : 'RSVP'}
              </button>
            </div>
          ))}
        </div>
        <button 
          className="mt-4 text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200"
          onClick={() => navigate('/events')}
        >
          See all events
        </button>
      </Card>
    </aside>
  );
};

export default LeftSidebar;