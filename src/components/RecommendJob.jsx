import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiArrowLeft, FiMapPin, FiClock, FiFilter, FiSearch, FiBookmark, FiEye, FiCalendar, FiDollarSign, FiUpload, FiMail, FiPhone, FiUser, FiFileText, FiLinkedin, FiGithub, FiX } from 'react-icons/fi';

const RecommendedJobs = () => {
  const [currentLocation, setCurrentLocation] = useState('Kathmandu');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    experience: '',
    education: '',
    skills: '',
    coverLetter: '',
    expectedSalary: '',
    noticePeriod: '',
    cvFile: null,
    portfolioFile: null
  });

  // Enhanced job data with Nepali context
  const allRecommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Nepal',
      location: 'Kathmandu',
      type: 'Full-time',
      salary: 'Rs. 80,000 - 1,20,000',
      salaryRange: [80000, 120000],
      posted: '1 day ago',
      registrationDate: '2025-06-11T10:30:00Z',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team in Kathmandu. You will work on React.js applications and collaborate with our international clients.',
      requirements: ['React.js', 'JavaScript', 'HTML/CSS', 'Git'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Training Budget'],
      image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&h=200&fit=crop',
      saved: false,
      views: 234,
      applicants: 45
    },
    {
      id: 2,
      title: 'Content Writer (Nepali/English)',
      company: 'Digital Nepal',
      location: 'Pokhara',
      type: 'Contract',
      salary: 'Rs. 2,000 - 3,500/day',
      salaryRange: [60000, 105000],
      posted: '3 days ago',
      registrationDate: '2025-06-09T14:15:00Z',
      description: 'Join our team to create engaging content in both Nepali and English for various digital platforms and tourism sector.',
      requirements: ['Bilingual (Nepali/English)', 'SEO Knowledge', 'Content Strategy'],
      benefits: ['Remote Work', 'Flexible Schedule', 'Performance Bonus'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop',
      saved: false,
      views: 189,
      applicants: 23
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'Himalayan Tech',
      location: 'Kathmandu',
      type: 'Full-time',
      salary: 'Rs. 1,00,000 - 1,50,000',
      salaryRange: [100000, 150000],
      posted: '1 week ago',
      registrationDate: '2025-06-05T09:00:00Z',
      description: 'Seeking an experienced Backend Engineer to work on scalable applications serving clients across South Asia.',
      requirements: ['Node.js', 'MongoDB', 'API Development', 'AWS'],
      benefits: ['Health Insurance', 'Annual Bonus', 'Learning Budget'],
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop',
      saved: false,
      views: 312,
      applicants: 67
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Minds Nepal',
      location: 'Lalitpur',
      type: 'Full-time',
      salary: 'Rs. 70,000 - 1,00,000',
      salaryRange: [70000, 100000],
      posted: '5 days ago',
      registrationDate: '2025-06-07T16:45:00Z',
      description: 'Design beautiful and intuitive interfaces for local and international clients. Work with modern design tools and methodologies.',
      requirements: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      benefits: ['Creative Freedom', 'Modern Office', 'Design Conferences'],
      image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=300&h=200&fit=crop',
      saved: false,
      views: 156,
      applicants: 34
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      company: 'Growth Hub Nepal',
      location: 'Kathmandu',
      type: 'Full-time',
      salary: 'Rs. 60,000 - 90,000',
      salaryRange: [60000, 90000],
      posted: '2 days ago',
      registrationDate: '2025-06-10T11:20:00Z',
      description: 'Lead digital marketing campaigns for growing Nepali businesses. Focus on social media, PPC, and content marketing.',
      requirements: ['Google Ads', 'Facebook Ads', 'Analytics', 'Content Creation'],
      benefits: ['Performance Bonus', 'Flexible Hours', 'Training Programs'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      saved: false,
      views: 278,
      applicants: 52
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'AppCraft Nepal',
      location: 'Kathmandu',
      type: 'Full-time',
      salary: 'Rs. 85,000 - 1,25,000',
      salaryRange: [85000, 125000],
      posted: '4 days ago',
      registrationDate: '2025-06-08T13:30:00Z',
      description: 'Develop innovative mobile applications for the Nepali market. Work with Flutter and native technologies.',
      requirements: ['Flutter', 'React Native', 'API Integration', 'App Store Guidelines'],
      benefits: ['Latest MacBook', 'Health Coverage', 'Startup Equity'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
      saved: false,
      views: 201,
      applicants: 38
    }
  ];

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const handleInputChange = (field, value) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Here you would typically send the application data to your backend
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!\n\nWe'll review your application and get back to you soon.`);
    
    // Reset form
    setApplicationData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: '',
      github: '',
      portfolio: '',
      experience: '',
      education: '',
      skills: '',
      coverLetter: '',
      expectedSalary: '',
      noticePeriod: '',
      cvFile: null,
      portfolioFile: null
    });
    setShowApplicationForm(false);
    setSelectedJob(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredJobs = allRecommendedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'all' || job.location === locationFilter;
    const matchesSalary = salaryFilter === 'all' || 
                         (salaryFilter === 'high' && job.salaryRange[0] >= 100000) ||
                         (salaryFilter === 'medium' && job.salaryRange[0] >= 60000 && job.salaryRange[0] < 100000) ||
                         (salaryFilter === 'entry' && job.salaryRange[0] < 60000);
    
    return matchesSearch && matchesLocation && matchesSalary;
  });

  const uniqueLocations = [...new Set(allRecommendedJobs.map(job => job.location))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 font-sans text-gray-800">
     
  

      <div className="max-w-7xl mx-auto p-22">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-purple-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200"
            >
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <select
                  value={salaryFilter}
                  onChange={(e) => setSalaryFilter(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">All Salaries</option>
                  <option value="high">Rs. 1,00,000+</option>
                  <option value="medium">Rs. 60,000 - 1,00,000</option>
                  <option value="entry">Below Rs. 60,000</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <span className="text-sm text-gray-600">{filteredJobs.length} jobs found</span>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <div key={job.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-purple-100">
              {/* Job Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={job.image} 
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => handleSaveJob(job.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      savedJobs.has(job.id) 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white/80 text-gray-600 hover:bg-white hover:text-purple-500'
                    }`}
                  >
                    <FiBookmark className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Job Content */}
              <div className="p-6">
                <div className="mb-3">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{job.title}</h3>
                  <p className="text-purple-600 font-medium">{job.company}</p>
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <FiMapPin className="w-4 h-4 mr-1" />
                  <span className="mr-4">{job.location}</span>
                  <FiDollarSign className="w-4 h-4 mr-1" />
                  <span>{job.salary}</span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {job.description}
                </p>

                {/* Requirements */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-md text-xs">
                        {req}
                      </span>
                    ))}
                    {job.requirements.length > 3 && (
                      <span className="text-gray-500 text-xs">+{job.requirements.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <FiEye className="w-4 h-4 mr-1" />
                      <span>{job.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock className="w-4 h-4 mr-1" />
                      <span>{job.applicants} applied</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiCalendar className="w-4 h-4 mr-1" />
                    <span>Posted {job.posted}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedJob(job)}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <FiBriefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && !showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h2>
                  <p className="text-purple-600 font-medium">{selectedJob.company}</p>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <img 
                src={selectedJob.image} 
                alt={selectedJob.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-purple-700">Job Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>Location: {selectedJob.location}</div>
                    <div>Type: {selectedJob.type}</div>
                    <div>Salary: {selectedJob.salary}</div>
                    <div>Posted: {selectedJob.posted}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-purple-700">Description</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-purple-700">Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.requirements.map((req, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2 text-purple-700">Benefits</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {selectedJob.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button 
                    onClick={() => handleApplyNow(selectedJob)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    Apply Now
                  </button>
                  <button 
                    onClick={() => handleSaveJob(selectedJob.id)}
                    className={`px-6 py-3 rounded-lg transition-colors font-medium ${
                      savedJobs.has(selectedJob.id)
                        ? 'bg-purple-500 text-white hover:bg-purple-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {savedJobs.has(selectedJob.id) ? 'Saved' : 'Save Job'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Apply for {selectedJob.title}</h2>
                  <p className="text-purple-600 font-medium">{selectedJob.company}</p>
                </div>
                <button 
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedJob(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-700 mb-4 flex items-center">
                    <FiUser className="mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={applicationData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={applicationData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={applicationData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="+977-9800000000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        value={applicationData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Links */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-indigo-700 mb-4 flex items-center">
                    <FiLinkedin className="mr-2" />
                    Professional Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={applicationData.linkedIn}
                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Profile</label>
                      <input
                        type="url"
                        value={applicationData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://github.com/yourusername"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Website</label>
                      <input
                        type="url"
                        value={applicationData.portfolio}
                        onChange={(e) => handleInputChange('portfolio', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-pink-700 mb-4 flex items-center">
                    <FiBriefcase className="mr-2" />
                    Professional Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Experience *</label>
                      <textarea
                        required
                        value={applicationData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        rows={4}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Describe your relevant work experience, including job titles, companies, and key achievements..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education *</label>
                      <textarea
                        required
                        value={applicationData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your educational background, degrees, certifications..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                      <textarea
                        required
                        value={applicationData.skills}
                        onChange={(e) => handleInputChange('skills', e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="List your relevant skills, technologies, and tools..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
                        <input
                          type="text"
                          value={applicationData.expectedSalary}
                          onChange={(e) => handleInputChange('expectedSalary', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Rs. 80,000 or Negotiable"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notice Period</label>
                        <select
                          value={applicationData.noticePeriod}
                          onChange={(e) => handleInputChange('noticePeriod', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select notice period</option>
                          <option value="immediate">Immediate</option>
                          <option value="15days">15 days</option>
                          <option value="1month">1 month</option>
                          <option value="2months">2 months</option>
                          <option value="3months">3 months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-700 mb-4 flex items-center">
                    <FiFileText className="mr-2" />
                    Cover Letter
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why are you interested in this position? *</label>
                    <textarea
                      required
                      value={applicationData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      rows={5}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell us why you're the perfect fit for this role and what you can bring to our team..."
                    />
                  </div>
                </div>

                {/* File Uploads */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-700 mb-4 flex items-center">
                    <FiUpload className="mr-2" />
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload('cvFile', e.target.files[0])}
                          className="hidden"
                          id="cv-upload"
                          required
                        />
                        <label htmlFor="cv-upload" className="cursor-pointer">
                          <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {applicationData.cvFile ? applicationData.cvFile.name : 'Click to upload your CV'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (max 5MB)</p>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Additional Documents</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.zip"
                          onChange={(e) => handleFileUpload('portfolioFile', e.target.files[0])}
                          className="hidden"
                          id="portfolio-upload"
                        />
                        <label htmlFor="portfolio-upload" className="cursor-pointer">
                          <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            {applicationData.portfolioFile ? applicationData.portfolioFile.name : 'Optional: Upload portfolio'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, ZIP (max 10MB)</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Requirements Checklist */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-4">Job Requirements</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 mb-3">Please confirm you meet the following requirements:</p>
                    {selectedJob.requirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="checkbox" id={`req-${index}`} className="rounded text-purple-600" />
                        <label htmlFor={`req-${index}`} className="text-sm text-gray-700">{req}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="terms" required className="mt-1 rounded text-purple-600" />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-purple-600 hover:underline">Terms and Conditions</a> and 
                      <a href="#" className="text-purple-600 hover:underline ml-1">Privacy Policy</a>. 
                      I consent to the processing of my personal data for recruitment purposes.
                    </label>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedJob(null);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedJobs;