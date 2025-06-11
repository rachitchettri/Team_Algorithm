// src/App.js
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
import { AuthProvider } from "./components/Context/authContext"; // Import AuthProvider
import ProtectedRoute from "./components/course/utils/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    // Wrap the entire application with AuthProvider to make auth context available
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
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

  {/* Protected routes */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
  <Route
    path="/courses"
    element={
      <ProtectedRoute>
        <Course />
      </ProtectedRoute>
    }
  />
  <Route
    path="/recommended-jobs"
    element={
      <ProtectedRoute>
        <RecommendedJobs />
      </ProtectedRoute>
    }
  />
  <Route
    path="/events"
    element={
      <ProtectedRoute>
        <Events />
      </ProtectedRoute>
    }
  />
  <Route
    path="/events/:eventId"
    element={
      <ProtectedRoute>
        <EventDetail />
      </ProtectedRoute>
    }
  />
</Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
