import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Simple 404 Not Found Component
const NotFound = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-grow">
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

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="chat" element={<ChatApp />} />
                <Route path="courses" element={<Course />} />
                <Route path="recommended-jobs" element={<RecommendedJobs />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:eventId" element={<EventDetail />} />
                <Route path="register-check" element={<RegisterCheckPage />} />
              </Route>
            </Route>

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
