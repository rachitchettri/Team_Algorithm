import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PI from "../assets/images/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for logged in user on component mount and when location changes
  useEffect(() => {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    setCurrentUser(user ? JSON.parse(user) : null);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 10);
      setShowBackToTop(scrollY > 300);

      if (location.pathname === "/") {
        const sections = ["home", "about", "services", "gallery", "contact"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && el.offsetTop - 100 <= scrollY && el.offsetTop + el.offsetHeight > scrollY) {
            setActiveLink(section);
            break;
          }
        }
      } else {
        const pathSegments = location.pathname.split('/');
        const currentPathSegment = pathSegments[1];
        setActiveLink(currentPathSegment || "home");
      }
    };

    const initialPathSegments = location.pathname.split('/');
    const initialPathSegment = initialPathSegments[1];
    setActiveLink(initialPathSegment || "home");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: "Home", route: "/", section: "home" },
    { name: "Courses", route: "/courses" },
    { name: "Jobs", route: "/recommended-jobs" },
    { name: "Events", route: "/events" },
    
  
  ];

  // Animation variants remain the same
  const menuVariants = {
    open: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    closed: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-lg py-2 border-b border-purple-100"
            : "bg-gradient-to-b from-purple-900 to-purple-800 py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={PI}
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
              />
              <span className={`ml-3 text-xl sm:text-2xl font-bold ${
                scrolled ? "text-purple-800" : "text-white"
              }`}>
                Leap & Learn
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.section ? (
                    <button
                      onClick={() => scrollToSection(item.section)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        (activeLink === item.section && location.pathname === '/')
                          ? "text-white bg-purple-600"
                          : scrolled 
                            ? "text-purple-700 hover:bg-purple-50"
                            : "text-purple-100 hover:bg-purple-700 hover:bg-opacity-30"
                      }`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.route}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        activeLink === item.route.substring(1) || (activeLink === 'home' && item.route === '/')
                          ? "text-white bg-purple-600"
                          : scrolled 
                            ? "text-purple-700 hover:bg-purple-50"
                            : "text-purple-100 hover:bg-purple-700 hover:bg-opacity-30"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="ml-2 px-4 py-2 bg-white text-purple-700 rounded-lg font-medium hover:bg-purple-50 transition-colors shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-md focus:outline-none ${
                scrolled ? "text-purple-700" : "text-white"
              }`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col h-full p-4">
                  <div className="flex items-center justify-between p-4 border-b border-purple-100">
                    <div className="flex items-center">
                      <img
                        src={PI}
                        alt="Logo"
                        className="w-10 h-10 rounded-full border-2 border-purple-600"
                      />
                      <span className="ml-3 text-xl font-bold text-purple-800">
                        Leap & Learn
                      </span>
                    </div>
                    <button
                      className="p-1 rounded-md text-purple-700 hover:bg-purple-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto py-4">
                    {navItems.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        className="px-4 py-3"
                      >
                        {item.section ? (
                          <button
                            onClick={() => scrollToSection(item.section)}
                            className={`w-full text-left py-2 px-3 rounded-lg ${
                              (activeLink === item.section && location.pathname === '/')
                                ? "bg-purple-100 text-purple-800 font-medium"
                                : "text-purple-700 hover:bg-purple-50"
                            }`}
                          >
                            {item.name}
                          </button>
                        ) : (
                          <Link
                            to={item.route}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block w-full py-2 px-3 rounded-lg ${
                              activeLink === item.route.substring(1) || (activeLink === 'home' && item.route === '/')
                                ? "bg-purple-100 text-purple-800 font-medium"
                                : "text-purple-700 hover:bg-purple-50"
                            }`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-purple-100">
                    {currentUser ? (
                      <motion.button
                        variants={itemVariants}
                        onClick={handleLogout}
                        className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md"
                      >
                        Logout
                      </motion.button>
                    ) : (
                      <>
                        <motion.div variants={itemVariants} className="mb-3">
                          <Link
                            to="/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full py-2 px-4 bg-purple-600 text-white rounded-lg font-medium text-center hover:bg-purple-700 transition-colors shadow-md"
                          >
                            Login
                          </Link>
                        </motion.div>
                        <motion.div variants={itemVariants}>
                          <Link
                            to="/register"
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full py-2 px-4 bg-white text-purple-700 border border-purple-300 rounded-lg font-medium text-center hover:bg-purple-50 transition-colors shadow-md"
                          >
                            Sign Up
                          </Link>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none transition-all duration-300 z-40"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;