
// import { FiUsers, FiBookOpen, FiBriefcase } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import Card from './Card';


// const LeftSidebar = ({
//   activeTab,
//   setActiveTab,
//   upcomingEvents,
//   handleAttendEvent
// }) => {
//   const navigate = useNavigate();

//   const handleNavigation = (tab) => {
//     console.log(`Navigating to /${tab}`);
//     setActiveTab(tab);
//     navigate(`/${tab}`);
//   };

//   return (
//     <div className="fixed top-35 left-3 ">

//       <aside className="hidden lg:flex flex-col w-72 max-h-[calc(100vh-64px)] gap-6 fixed ">
//         {/* Profile Section */}
//         <Card className="p-3 flex-shrink-0 shadow-sm">
//           <div className="flex items-center space-x-4 mb-5">
//             <img
//               src="https://randomuser.me/api/portraits/men/75.jpg"
//               alt="Profile"
//               className="h-16 w-16 rounded-full object-cover border-2 border-purple-600"
//             />
//             <div>
//               <h3 className="font-semibold text-gray-900">John Doe</h3>
//               <p className="text-sm text-gray-500">Web Developer</p>
//             </div>
//           </div>
//           <div>
//             <p className="text-sm text-gray-600 flex justify-between mb-2">
//               <span>Profile completeness</span>
//               <span className="font-semibold text-purple-600">75%</span>
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2.5">
//               <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
//             </div>
//             <button
//               className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold transition"
//               onClick={() => navigate('/profile')}
//             >
//               Complete Profile
//             </button>
//           </div>
//         </Card>

//         {/* Navigation Section */}
//         <Card className="p-3  shadow-sm">
//           <nav>
//             <ul className="space-y-2">
//               {[
//                 { tab: 'feed', label: 'My Feed', icon: FiUsers },
//                 { tab: 'courses', label: 'Learning', icon: FiBookOpen },
//                 { tab: 'recommended-jobs', label: 'Jobs', icon: FiBriefcase },
//                 { tab: 'network', label: 'Network', icon: FiUsers },
//               ].map(({ tab, label, icon: Icon }) => (
//                 <li key={tab}>
//                   <button
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleNavigation(tab);
//                     }}
//                     className={`w-full cursor-pointer text-left px-4 py-3 rounded-md flex items-center space-x-3 transition-colors duration-200 ${activeTab === tab
//                       ? 'bg-purple-100 text-purple-700 font-semibold'
//                       : 'text-gray-700 hover:bg-gray-100 hover:text-purple-700'

//                       }`}
//                   >
//                     <Icon className="text-xl" />
//                     <span>{label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </Card>

//         {/* Upcoming Events Section */}
//         {/* <Card className="p-6 flex-grow shadow-sm flex flex-col">
//           <h3 className="font-semibold text-gray-900 mb-4 text-lg">Upcoming Events</h3>

//           <ScrollArea.Root className="flex-grow rounded-md border border-gray-200">
//             <ScrollArea.Viewport className="h-72 p-2">
//               <div className="space-y-4">
//                 {upcomingEvents.length === 0 ? (
//                   <p className="text-gray-500 text-sm">No upcoming events.</p>
//                 ) : (
//                   upcomingEvents.map(event => (
//                     <div
//                       key={event.id}
//                       className="rounded-md bg-purple-50 p-3"
//                     >
//                       <h4 className="font-semibold text-gray-900">{event.title}</h4>
//                       <p className="text-sm text-gray-600 mt-1">{event.date} • {event.time}</p>
//                       <p className="text-sm text-gray-600">{event.location}</p>
//                       <button
//                         onClick={() => handleAttendEvent(event.id)}
//                         className={`mt-3 text-sm font-semibold px-4 py-1.5 rounded-full transition-colors duration-200 ${event.attending
//                             ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
//                             : 'bg-purple-600 text-white hover:bg-purple-700'
//                           }`}
//                       >
//                         {event.attending ? 'Cancel RSVP' : 'RSVP'}
//                       </button>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </ScrollArea.Viewport>
//             <ScrollArea.Scrollbar orientation="vertical" className="bg-gray-100 w-2 rounded-md">
//               <ScrollArea.Thumb className="bg-purple-600 rounded-md" />
//             </ScrollArea.Scrollbar>
//             <ScrollArea.Corner />
//           </ScrollArea.Root>

//           <button
//             className="mt-4 text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200 self-start"
//             onClick={() => navigate('/events')}
//           >
//             See all events
//           </button>
//         </Card> */}
//       </aside>
//     </div>
//   );
// };

// export default LeftSidebar;


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
              { tab: 'feed', label: 'My Feed', icon: FiUsers },
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
