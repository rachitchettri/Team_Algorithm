import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Course from "./components/course/course";
import RecommendedJobs from "./components/RecommendJob";
import Events from "./components/events/event";
import EventDetail from "./components/events/Eventdetail";
import Footer from "./components/footer";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        
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

            {/* Regular routes (no protection) */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/recommended-jobs" element={<RecommendedJobs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;