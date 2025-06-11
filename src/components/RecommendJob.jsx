// RecommendedJobs.jsx
import React from 'react';
import { FiBriefcase, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const RecommendedJobs = () => {
  const navigate = useNavigate();

  // Mock data for recommended jobs - you might fetch this from an API in a real app
  const allRecommendedJobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechSolutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      posted: '1 day ago',
      description: 'We are looking for a skilled Frontend Developer to join our dynamic team. You will be responsible for developing and implementing user interface components using React.js workflows, and ensuring the technical feasibility of UI/UX designs.',
      saved: false
    },
    {
      id: 2,
      title: 'Educational Content Writer',
      company: 'LearnHub',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$50 - $70/hr',
      posted: '3 days ago',
      description: 'Join LearnHub to create engaging and informative educational content for our online platform. Ideal candidate will have a strong background in curriculum design or instructional writing.',
      saved: false
    },
    {
      id: 3,
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      posted: '1 week ago',
      description: 'Seeking an experienced Backend Engineer to design, develop, and maintain robust and scalable server-side applications. Proficiency in Node.js, Python, or Java is a plus.',
      saved: false
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'CreativeFlow',
      location: 'Remote',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      posted: '5 days ago',
      description: 'Passionate UI/UX Designer wanted to craft intuitive and visually appealing user experiences. Must have a strong portfolio demonstrating proficiency in Figma, Sketch, or Adobe XD.',
      saved: false
    },
    {
      id: 5,
      title: 'DevOps Specialist',
      company: 'CloudGenius',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      posted: '2 weeks ago',
      description: 'We are looking for a DevOps Specialist to automate and streamline our operations and processes. Experience with AWS, Docker, Kubernetes, and CI/CD pipelines is required.',
      saved: false
    },
    // Add more job listings here
    {
      id: 6,
      title: 'Data Analyst',
      company: 'Insightful Analytics',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$75,000 - $95,000',
      posted: '1 week ago',
      description: 'Analyze complex datasets to identify trends, create reports, and provide actionable insights to support business decisions. Proficiency in SQL and statistical software is essential.',
      saved: false
    },
    {
      id: 7,
      title: 'Mobile App Developer (iOS)',
      company: 'AppInnovate',
      location: 'Remote',
      type: 'Full-time',
      salary: '$95,000 - $125,000',
      posted: '4 days ago',
      description: 'Develop and maintain high-quality iOS applications. Must be proficient in Swift/Objective-C and have experience with RESTful APIs and third-party libraries.',
      saved: false
    },
    {
      id: 8,
      title: 'Senior Software Architect',
      company: 'Enterprise Solutions',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      posted: '3 weeks ago',
      description: 'Lead the design and architecture of complex software systems. Requires extensive experience in software development life cycle and strong leadership skills.',
      saved: false
    },
    {
      id: 9,
      title: 'Product Manager',
      company: 'GrowthForge',
      location: 'San Jose, CA',
      type: 'Full-time',
      salary: '$110,000 - $145,000',
      posted: '6 days ago',
      description: 'Define product vision, strategy, and roadmap for our innovative software products. Collaborate closely with engineering, design, and marketing teams.',
      saved: false
    },
    {
      id: 10,
      title: 'Network Administrator',
      company: 'SecureNet',
      location: 'Dallas, TX',
      type: 'Full-time',
      salary: '$70,000 - $90,000',
      posted: '2 days ago',
      description: 'Manage and maintain our company\'s network infrastructure. Responsibilities include network security, performance monitoring, and troubleshooting.',
      saved: false
    }
  ];

  const handleSaveJob = (jobId) => {
    console.log(`Job ${jobId} saved`);
    // In a real application, you'd update state or send to a backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 font-sans text-gray-800 p-8">
      <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg p-5 rounded-xl mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/')} // Go back to home page
          className="p-2 rounded-full hover:bg-purple-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300"
          aria-label="Go back"
        >
          <FiArrowLeft className="text-3xl" />
        </button>
        <h1 className="text-3xl font-extrabold tracking-wide flex items-center space-x-3">
          <FiBriefcase className="text-purple-200" />
          <span>Recommended Jobs</span>
        </h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {allRecommendedJobs.map(job => (
          <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-purple-100 hover:border-purple-300 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-xl text-purple-800">{job.title}</h2>
                <button
                  onClick={() => handleSaveJob(job.id)}
                  className="text-gray-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100 transition-all duration-200"
                  aria-label="Save job"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={job.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <p className="text-md text-gray-700 mb-2">{job.company} • {job.location}</p>
              <div className="flex flex-wrap items-center space-x-3 text-sm mb-3">
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full font-medium">{job.type}</span>
                <span className="text-gray-600 font-medium">{job.salary}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{job.description}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Posted: {job.posted}</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full font-semibold shadow-md transition-all duration-200">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;