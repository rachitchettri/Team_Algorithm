// import { FiDollarSign } from 'react-icons/fi';
// import { useNavigate } from 'react-router-dom';
// import Card from './Card';

// const RecommendedJobs = ({ recommendedJobs, handleSaveJob, handleSeeAllJobs }) => {
//   const navigate = useNavigate();

//   const handleJobClick = (jobId) => {
//     navigate('/recommended-jobs');
//   };

//   const handleSaveClick = (e, jobId) => {
//     e.stopPropagation(); // Prevent card click when saving
//     handleSaveJob(jobId);
//   };

//   return (
//     <Card className="p-6 mb-6 sticky top-24">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="font-bold text-lg text-gray-800">Recommended Jobs</h3>
//         <button
//           onClick={handleSeeAllJobs}
//           className="text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200"
//         >
//           See all
//         </button>
//       </div>
//       <div className="space-y-4">
//         {recommendedJobs.map(job => (
//           <div 
//             key={job.id} 
//             className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 cursor-pointer group transition-all duration-200 hover:shadow-sm"
//             onClick={() => handleJobClick(job.id)}
//           >
//             <div className="flex justify-between items-start">
//               <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200 text-base">{job.title}</h4>
//               <button
//                 onClick={(e) => handleSaveClick(e, job.id)}
//                 className="text-gray-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100 transition-all duration-200"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={job.saved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//                 </svg>
//               </button>
//             </div>
//             <p className="text-sm text-gray-600 mb-1">{job.company} • {job.location}</p>
//             <div className="flex items-center space-x-2 text-xs mb-2">
//               <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">{job.type}</span>
//               <div className="flex items-center space-x-1 text-gray-600 font-medium">
//                 <FiDollarSign className="text-gray-500" />
//                 <span>{job.salary}</span>
//               </div>
//             </div>
//             <p className="text-xs text-gray-400">{job.posted}</p>
//           </div>
//         ))}
//       </div>
//     </Card>
//   );
// };

// export default RecommendedJobs;

import { FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from './Card'; // Make sure Card is a valid wrapper component

const RecommendedJobs = () => {
  const navigate = useNavigate();

  // ✅ Sample mock data defined in the same file
  const recommendedJobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Tech Co.",
      location: "Remote",
      type: "Full-Time",
      salary: "$70k–$90k",
      posted: "2 days ago",
      saved: false,
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "CloudOps",
      location: "Kathmandu",
      type: "Part-Time",
      salary: "$40k–$60k",
      posted: "1 week ago",
      saved: true,
    },
  ];

  // ✅ Local handlers
  const handleJobClick = (jobId) => {
    console.log("Navigate to job detail with ID:", jobId);
    navigate(`/recommended-jobs`);
  };

  const handleSaveJob = (jobId) => {
    console.log("Saved job ID:", jobId);
  };

  const handleSaveClick = (e, jobId) => {
    e.stopPropagation();
    handleSaveJob(jobId);
  };

  const handleSeeAllJobs = () => {
    console.log("See all jobs clicked");
  };

  return (
    <Card className="p-6 mt-10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Recommended Jobs</h3>
        <button
          onClick={handleSeeAllJobs}
          className="text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200"
        >
          See all
        </button>
      </div>
      <div className="space-y-4">
        {recommendedJobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 cursor-pointer group transition-all duration-200 hover:shadow-sm"
            onClick={() => handleJobClick(job.id)}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-200 text-base">
                {job.title}
              </h4>
              <button
                onClick={(e) => handleSaveClick(e, job.id)}
                className="text-gray-400 hover:text-purple-700 p-1 rounded-full hover:bg-purple-100 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill={job.saved ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              {job.company} • {job.location}
            </p>
            <div className="flex items-center space-x-2 text-xs mb-2">
              <span className="bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
                {job.type}
              </span>
              <div className="flex items-center space-x-1 text-gray-600 font-medium">
                <FiDollarSign className="text-gray-500" />
                <span>{job.salary}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400">{job.posted}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecommendedJobs;
