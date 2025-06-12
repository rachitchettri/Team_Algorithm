import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Building2, 
  MapPin, 
  Shield,
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff,
  Loader2,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Star,
  Download
} from 'lucide-react';
 // Importing mock data for initial state
// Mock data storage using in-memory arrays (simulating JSON files)
let usersData = [];
let providersData = [];

// Utility functions to simulate JSON file operations
const getUsersData = () => [...usersData];
const getProvidersData = () => [...providersData];

const saveUsersData = (users) => {
  usersData = [...users];
  // Download the JSON file for manual saving
  downloadJSON(users, 'registerUser.json');
};

const saveProvidersData = (providers) => {
  providersData = [...providers];
  // Download the JSON file for manual saving
  downloadJSON(providers, 'registerProvider.json');
};

const downloadJSON = (data, filename) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const checkEmailExists = (email) => {
  const allUsers = [...getUsersData(), ...getProvidersData()];
  return allUsers.some(user => user.email === email);
};

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'finder',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    companyAddress: '',
    companyLicense: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { role, name, email, password, confirmPassword, companyName, companyAddress, companyLicense } = formData;

  useEffect(() => {
    if (password) {
      const strength =
        password.length < 6 ? 'Weak' :
        password.length < 10 ? 'Medium' : 'Strong';
      setPasswordStrength(strength);
    } else {
      setPasswordStrength('');
    }
  }, [password]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (message.text) setMessage({ text: '', type: '' });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (role === 'provider') {
      if (!companyName.trim()) {
        newErrors.companyName = 'Company name is required';
        isValid = false;
      }
      if (!companyAddress.trim()) {
        newErrors.companyAddress = 'Company address is required';
        isValid = false;
      }
      if (!companyLicense.trim()) {
        newErrors.companyLicense = 'Company license is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const userData = {
      role,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // Remember to hash this in production
      ...(role === 'provider' && {
        companyName: companyName.trim(),
        companyAddress: companyAddress.trim(),
        companyLicense: companyLicense.trim()
      })
    };

    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // First check if the response is OK
    if (!response.ok) {
      const errorData = await response.text(); // Try to read as text first
      try {
        // If it's JSON, parse it
        const jsonError = JSON.parse(errorData);
        throw new Error(jsonError.error || 'Registration failed');
      } catch {
        // If not JSON, use the raw text
        throw new Error(errorData || 'Registration failed');
      }
    }

    // If response is OK, parse as JSON
    const data = await response.json();

    setMessage({
      text: `Welcome ${userData.name}! Registration successful as ${role}.`,
      type: 'success',
    });

    // Reset form
    setFormData({
      role: 'finder',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      companyAddress: '',
      companyLicense: '',
    });

  } catch (error) {
    setMessage({
      text: error.message || 'Registration failed. Please try again.',
      type: 'error',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleDownloadData = () => {
    if (usersData.length > 0) {
      downloadJSON(usersData, 'registerUser.json');
    }
    if (providersData.length > 0) {
      downloadJSON(providersData, 'registerProvider.json');
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans antialiased overflow-hidden">
      {/* Left Side: Promotional Content */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-br from-purple-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-lg"></div>

        <div className="relative z-10 w-full max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Join <span className="text-purple-200">Leap&Learn</span> Today
          </h1>
          <p className="text-lg text-purple-100 mb-8 opacity-90">
            Start your learning journey with thousands of courses and expert instructors.
          </p>

          <div className="relative w-full h-56 mb-8">
            <div className="w-full h-full bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-purple-200" />
                </div>
                <p className="text-purple-100 font-medium">Ready to Learn?</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              { icon: <Lightbulb className="w-5 h-5 text-purple-200" />, title: "Interactive", desc: "Engaging content" },
              { icon: <TrendingUp className="w-5 h-5 text-purple-200" />, title: "Progress", desc: "Track your growth" },
              { icon: <BookOpen className="w-5 h-5 text-purple-200" />, title: "Variety", desc: "Multiple subjects" },
              { icon: <Star className="w-5 h-5 text-purple-200" />, title: "Quality", desc: "Premium courses" }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 cursor-pointer"
              >
                <div className="p-1.5 bg-purple-600/30 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-purple-50">{item.title}</h3>
                  <p className="text-xs text-purple-100 opacity-80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Download Button */}
          {(usersData.length > 0 || providersData.length > 0) && (
            <button
              onClick={handleDownloadData}
              className="mt-6 w-full flex items-center justify-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Download JSON Files
            </button>
          )}
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Join our learning community today
            </p>
          </div>

          {/* Info Box */}
          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> After registration, JSON files will automatically download. Save them to your project's public folder manually.
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I want to
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'finder' }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  role === 'finder'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <User className="w-5 h-5 mx-auto mb-1" />
                Find Jobs
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'provider' }))}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                  role === 'provider'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Building2 className="w-5 h-5 mx-auto mb-1" />
                Post Jobs
              </button>
            </div>
          </div>

          {message.text && (
            <div className={`p-3 rounded-lg mb-6 flex items-start gap-2 text-sm ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className={`mt-0.5 flex-shrink-0 ${
                message.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}>
                {message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                  placeholder="••••••••"
                  value={password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <p className="mt-1 text-xs">
                  Strength: <span className={`font-medium ${
                    passwordStrength === 'Strong' ? 'text-green-600' : 
                    passwordStrength === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>{passwordStrength}</span>
                </p>
              )}
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Company Fields for Provider Role */}
            {role === 'provider' && (
              <>
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                      placeholder="Your company name"
                      value={companyName}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
                </div>

                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Address
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="companyAddress"
                      name="companyAddress"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                      placeholder="Company address"
                      value={companyAddress}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.companyAddress && <p className="mt-1 text-sm text-red-600">{errors.companyAddress}</p>}
                </div>

                <div>
                  <label htmlFor="companyLicense" className="block text-sm font-medium text-gray-700 mb-1">
                    Company License Number
                  </label>
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Shield className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="companyLicense"
                      name="companyLicense"
                      type="text"
                      required
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                      placeholder="License number"
                      value={companyLicense}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.companyLicense && <p className="mt-1 text-sm text-red-600">{errors.companyLicense}</p>}
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
                  isSubmitting
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;