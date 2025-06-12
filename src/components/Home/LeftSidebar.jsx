import { FiUsers, FiBookOpen, FiBriefcase } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Card from './Card';

const LeftSidebar = ({ activeTab, upcomingEvents, handleAttendEvent }) => {
  return (
<div className="fixed top-[100px] left-3  h-screen">
    <div className=" hidden lg:flex flex-col w-72 h-full  gap-6 z-50">
      {/* Profile Section */}
      <Card className="p-3 flex-shrink-0 shadow-sm">
        <div className="flex items-center space-x-4 mb-5">
      
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover border-2 border-purple-600"
          />
          <div>
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <p className="text-sm text-gray-500">Web Developer</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-600 flex justify-between mb-2">
            <span>Profile completeness</span>
            <span className="font-semibold text-purple-600">75%</span>
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <NavLink
            to="/profile"
            className="block w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold text-center transition"
          >
            Complete Profile
          </NavLink>
        </div>
      </Card>

      {/* Navigation Section */}
      <Card className="p-3 shadow-sm">
        <nav>
          <ul className="space-y-2">
            {[
              { tab: '', label: 'My Feed', icon: FiUsers },
              { tab: 'courses', label: 'Learning', icon: FiBookOpen },
              { tab: 'recommended-jobs', label: 'Jobs', icon: FiBriefcase },
              { tab: 'network', label: 'Network', icon: FiUsers },
            ].map(({ tab, label, icon: Icon }) => (
              <li key={tab}>
                <NavLink
                  to={`/${tab}`}
                  className={({ isActive }) =>
                    `w-full  px-4 py-3 rounded-md flex items-center space-x-3 transition-colors duration-200 ${
                      isActive
                        ? 'bg-purple-100 text-purple-700 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'
                    }`
                  }
                >
                  <Icon className="text-xl" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Card>
            </div>
    </div>
            
  );
};

export default LeftSidebar;