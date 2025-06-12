import { FiX, FiUsers, FiBookOpen, FiBriefcase, FiCalendar } from 'react-icons/fi';
import Card from './Card';

const MobileMenu = ({ 
  showMobileMenu, 
  setShowMobileMenu, 
  activeTab, 
  setActiveTab,
  upcomingEvents,
  handleAttendEvent
}) => {
  return (
    <>
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" onClick={() => setShowMobileMenu(false)}></div>
      )}

      <aside className={`fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${showMobileMenu ? 'translate-x-0 shadow-xl' : '-translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-200 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300">
            <FiX className="text-2xl text-gray-600" />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Profile"
              className="h-14 w-14 rounded-full object-cover border-2 border-purple-500"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">John Doe</h3>
              <p className="text-sm text-gray-600">Web Developer</p>
            </div>
          </div>
          <nav className="mb-8">
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => { setActiveTab('feed'); setShowMobileMenu(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'feed' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                >
                  <FiUsers className="text-xl" />
                  <span>My Feed</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('learning'); setShowMobileMenu(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'learning' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                >
                  <FiBookOpen className="text-xl" />
                  <span>Learning</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('jobs'); setShowMobileMenu(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'jobs' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                >
                  <FiBriefcase className="text-xl" />
                  <span>Jobs</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('network'); setShowMobileMenu(false); }}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${activeTab === 'network' ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'}`}
                >
                  <FiUsers className="text-xl" />
                  <span>Network</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-bold text-gray-800 mb-4 text-lg">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                      <FiCalendar className="text-xl" />
                    </div>
                    <div>
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
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;