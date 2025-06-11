import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PI from "../assets/images/logo.jpg";
import { motion, AnimatePresence } from "framer-motion";
import Course from "../components/course/course";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
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
      }
    };

    const path = location.pathname.substring(1);
    setActiveLink(path || "home");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleOpenSignUpForm = () => {
    setShowSignUpForm(true);
    setIsMenuOpen(false);
    document.body.style.overflow = "hidden";
  };
  const handleCloseSignUpForm = () => {
    setShowSignUpForm(false);
    document.body.style.overflow = "auto";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", section: "home" },
    { name: "About", path: "/about", section: "about" },
    { name: "Course", path: "/course", section: "course" },
    { name: "Gallery", path: "/gallery", section: "gallery" },
    { name: "Contact", path: "/contact", section: "contact" },
  ];

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
      transition: {
        duration: 0.2,
      },
    },
  };

  const logoVariants = {
    initial: { rotate: 0 },
    animate: { rotate: isHoveringLogo ? 360 : 0 },
  };

  return (
    <>
      {/* Navbar container */}
      <nav
        className={`fixed  top-0 left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300 ${
          scrolled ? "py-2 shadow-purple-500/30" : "py-4"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer select-none"
          >
            <img
              src={PI}
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-purple-600"
            />
            <span className="ml-3 text-2xl font-extrabold text-purple-700 ">
              Leap & Learn
            </span>
          </motion.div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-10 text-purple-700 font-semibold tracking-wide">
            {navItems.map(({ name, path, section }) => (
              <li key={name}>
                {path === "/" ? (
                  <button
                    onClick={() => scrollToSection(section)}
                    className={`relative group focus:outline-none ${
                      activeLink === section
                        ? "text-purple-900 font-bold"
                        : "hover:text-purple-800"
                    }`}
                  >
                    {name}
                    <span
                      className={`block h-0.5 bg-purple-600 rounded mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 ${
                        activeLink === section ? "max-w-full" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={path}
                    className={`relative group focus:outline-none ${
                      activeLink === section
                        ? "text-purple-900 font-bold"
                        : "hover:text-purple-800"
                    }`}
                  >
                    {name}
                    <span
                      className={`block h-0.5 bg-purple-600 rounded mt-1 max-w-0 group-hover:max-w-full transition-all duration-300 ${
                        activeLink === section ? "max-w-full" : ""
                      }`}
                    />
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={handleOpenSignUpForm}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 transition duration-300"
              >
                Sign Up
              </button>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-purple-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.ul
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl flex flex-col p-8 space-y-8 md:hidden border-l-4 border-purple-600"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              {navItems.map(({ name, path, section }) => (
                <motion.li
                  key={name}
                  variants={itemVariants}
                  className="text-purple-700 font-semibold text-lg"
                >
                  {path === "/" ? (
                    <button
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left focus:outline-none ${
                        activeLink === section ? "text-purple-900 font-bold" : "hover:text-purple-800"
                      }`}
                    >
                      {name}
                    </button>
                  ) : (
                    <Link
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full focus:outline-none ${
                        activeLink === section ? "text-purple-900 font-bold" : "hover:text-purple-800"
                      }`}
                    >
                      {name}
                    </Link>
                  )}
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <button
                  onClick={handleOpenSignUpForm}
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 w-full transition duration-300"
                >
                  Sign Up
                </button>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg hover:bg-purple-700 focus:outline-none transition duration-300"
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sign Up Modal */}
      <AnimatePresence>
        {showSignUpForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSignUpForm}
          >
            <motion.div
              className="bg-white rounded-xl p-10 max-w-md w-full relative shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseSignUpForm}
                className="absolute top-4 right-4 text-purple-700 hover:text-purple-900 text-3xl font-bold focus:outline-none"
                aria-label="Close sign up form"
              >
                &times;
              </button>
              <h2 className="text-3xl font-bold mb-6 text-purple-800 text-center">Sign Up</h2>
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full border border-purple-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 font-semibold"
                >
                  Register
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
