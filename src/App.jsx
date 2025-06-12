import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Home/Header"; // import your Header here
import Home from "./components/Home/Home";
import Course from "./components/course/course";
import RecommendedJobs from "./components/RecommendJob";
import Events from "./components/events/event";
import EventDetail from "./components/events/Eventdetail";
import Footer from "./components/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";
import ChatApp from "./components/Chat/ChatApp";
import RegisterCheckPage from "./components/course/components/registercheck";
import Profile from "./components/profile/profile";
import CVAnalyzer from "./components/Analyzer/CVanalyzer";

function App() {
  // user state lifted here, accessible to Header and Profile
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    tag: 'Student',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  });

  // for search input in header
  const [searchQuery, setSearchQuery] = useState('');

  // for mobile menu visibility in header
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">

        {/* Pass all required props to Header */}
        <Header
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowMobileMenu={setShowMobileMenu}
        />

        <div className="p-4 flex-grow">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
                  <Login />
                </div>
              }
            />
            <Route
              path="/register"
              element={
                <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
                  <Register />
                </div>
              }
            />

            {/* Regular routes */}
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatApp />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/recommended-jobs" element={<RecommendedJobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/CVanalyzer" element={<CVAnalyzer />} />
            {/* Pass user and setUser to Profile to update info */}
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/register-check" element={<RegisterCheckPage />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
