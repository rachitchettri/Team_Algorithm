import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'; // Using lucide-react for icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 font-sans border-t border-purple-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">Leap&Learn</h3> {/* Updated company name */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Empowering your learning journey with cutting-edge courses and expert-led training.
            Unlock your potential and build a brighter future with us.
          </p>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Leap&Learn. All rights reserved. {/* Updated copyright */}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Home</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Courses</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">About Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Contact</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Blog</a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Top Categories</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Programming</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Data Science</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Design</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">Marketing</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300 text-sm">IT & Software</a>
            </li>
          </ul>
        </div>

        {/* Contact Info & Social Media */}
        <div className="col-span-1 md:col-span-3 lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center text-gray-400 text-sm">
              <span className="mr-2 text-purple-400">📍</span> Biratnagar, Nepal {/* Updated location */}
            </li>
            <li className="flex items-center text-gray-400 text-sm">
              <span className="mr-2 text-purple-400">📧</span> leap&learn123@gmail.com {/* Updated email */}
            </li>
            <li className="flex items-center text-gray-400 text-sm">
              <span className="mr-2 text-purple-400">📞</span> +1 (555) 123-4567
            </li>
          </ul>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition duration-300" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300" aria-label="Twitter">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition duration-300" aria-label="Instagram">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition duration-300" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition duration-300" aria-label="GitHub">
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-xs pt-8 border-t border-gray-800">
        <p>Designed with ❤️ by Leap&Learn Team</p> {/* Updated design credit */}
      </div>
    </footer>
  );
};

export default Footer;
