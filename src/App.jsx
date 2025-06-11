
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Course from "./components/course/course"; // Fixed case sensitivity
import RecommendedJobs from "./components/RecommendJob";
import Footer from "./components/footer"; // Added missing import


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar /> {/* Moved Navbar outside the p-4 div for proper layout */}
        <div className="p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} /> {/* Pluralized for RESTful convention */}
            <Route path="/recommended-jobs" element={<RecommendedJobs />} />
           
          </Routes>
        </div>
        <Footer /> {/* Moved Footer outside the p-4 div for proper layout */}
      </div>
    </Router>
  );

}

export default App;