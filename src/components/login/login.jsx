import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Mock seekers data (would normally come from an API or JSON file)
const mockSeekers = [
  {
    id: "skr-001",
    role: "finder",
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123", // Note: In production, use hashed passwords
    skills: ["JavaScript", "React", "Node.js"],
    education: "Computer Science",
    experience: "3 years",
    createdAt: "2023-10-15T09:30:00Z"
  },
  {
    id: "skr-002",
    role: "finder",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: "password456",
    skills: ["Python", "Django", "Data Analysis"],
    education: "Information Technology",
    experience: "5 years",
    createdAt: "2023-10-16T10:15:00Z"
  },
    {
    id: "skr-003",
    role: "finder",
    name: "John Doe",
    email: "kushal@gmail.com",
    password: "password123", // Note: In production, use hashed passwords
    skills: ["JavaScript", "React", "Node.js"],
    education: "Computer Science",
    experience: "3 years",
    createdAt: "2023-10-15T09:30:00Z"
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Check against mock seekers data
    const matchedUser = mockSeekers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password.');
      return;
    }

    // Store user data in localStorage (simulating authentication)
    localStorage.setItem('loggedInUser', JSON.stringify({
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      skills: matchedUser.skills,
      // Don't store password in localStorage
    }));

    navigate('/'); // Redirect to dashboard
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">Job Seeker Login</h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your job seeker account
        </p>
        
        {/* Demo credentials hint */}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login as Seeker
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
          <p className="text-gray-600">
            Are you a provider?{' '}
            <Link
              to="/login-provider"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Provider login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;