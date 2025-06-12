import React, { useState, useEffect } from 'react';
import { Mail, Lock, CheckCircle, XCircle, Lightbulb, TrendingUp, BookOpen, Star, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import loginIllustration from '../../assets/images/illustration.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRememberMe = () => setRememberMe((prev) => !prev);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setLoading(true);

    if (!formData.email || !formData.password) {
      setMessage({ type: 'error', text: 'Email and password are required.' });
      setLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password, rememberMe); // You can modify login to accept rememberMe if supported
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setFormData({ email: '', password: '' });

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      }
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex font-sans antialiased overflow-hidden">
      {/* Left Side: Graphical/Promotional Content */}
      <div className="hidden md:flex w-1/2 flex-col rounded-4xl items-center justify-center p-8 bg-gradient-to-br from-purple-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-600 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10 blur-lg"></div>

        <div className="relative z-10 w-full max-w-md mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome Back to <span className="text-purple-200">Leap&Learn</span>
          </h1>
          <p className="text-lg text-purple-100 mb-8 opacity-90">
            Continue your learning journey with personalized courses and expert guidance.
          </p>

          <div className="relative w-full h-56 mb-8">
            <img
              src={loginIllustration}
              alt="Learning Illustration"
              className="w-full h-full object-contain filter drop-shadow-2xl"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/7E22CE/FFFFFF?text=Learning+Illustration"; }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {[
              { icon: <Lightbulb className="w-5 h-5 text-purple-200" />, title: "Personalized", desc: "Tailored courses" },
              { icon: <TrendingUp className="w-5 h-5 text-purple-200" />, title: "Career Growth", desc: "Valuable skills" },
              { icon: <BookOpen className="w-5 h-5 text-purple-200" />, title: "Rich Library", desc: "1000+ courses" },
              { icon: <Star className="w-5 h-5 text-purple-200" />, title: "Experts", desc: "Industry leaders" }
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
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 sm:p-8 md:p-12 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Sign In
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Enter your credentials to access your account
            </p>
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs sm:text-sm font-medium text-purple-600 hover:text-purple-500">
                  Forgot password?
                </Link>
              </div>
              <div className="relative rounded-lg">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
                  loading
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
