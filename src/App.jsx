// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home/Home";
// import Course from "./components/course/course";
// import RecommendedJobs from "./components/RecommendJob";
// import Events from "./components/events/event";
// import EventDetail from "./components/events/Eventdetail";
// import Footer from "./components/footer";
// import Login from "./components/login/login";
// import Register from "./components/register/register";
// import ChatApp from "./components/Chat/ChatApp";
// import RegisterCheckPage from "./components/course/components/registercheck";


// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-white flex flex-col">
        
//         <div className="p-4 flex-grow">
//           <Routes>
//             {/* Public routes */}
//             <Route
//               path="/login"
//               element={
//                 <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
//                   <Login />
//                 </div>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-100">
//                   <Register />
//                 </div>
//               }
//             />

//             {/* Regular routes (no protection) */}
//             <Route path="/" element={<Home />} />
//             <Route path="/chat" element={< ChatApp/>} />
//             <Route path="/courses" element={<Course />} />
//             <Route path="/recommended-jobs" element={<RecommendedJobs />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/register-check" element={<RegisterCheckPage/>} />
            
//             <Route path="/events/:eventId" element={<EventDetail />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

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
import MainLayout from "./components/layout/MainLayout"; // 👈 Your layout component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <div className="flex-grow">
          <Routes>
            {/* Public routes without layout */}
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

            {/* Routes using layout */}
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="chat" element={<ChatApp />} />
              <Route path="courses" element={<Course />} />
              <Route path="recommended-jobs" element={<RecommendedJobs />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:eventId" element={<EventDetail />} />
              <Route path="register-check" element={<RegisterCheckPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
