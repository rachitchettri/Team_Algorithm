// import RecommendedJobs from './RecommendedJobs';
// import SuggestedConnections from './SuggestedConnections';
// import LearningRecommendations from './LearningRecommendations';
// import Card from './Card';

// // const RightSidebar = ({ 
// //   recommendedJobs, 
// //   handleSaveJob, 
// //   handleSeeAllJobs,
// //   suggestedConnections,
// //   handleConnect,
// //   learningRecommendations,
// //   handleEnroll
// // }) => {
// //   return (
// //     <aside className="hidden lg:block w-80 flex-shrink-0">
// //       <RecommendedJobs 
// //         recommendedJobs={recommendedJobs}
// //         handleSaveJob={handleSaveJob}
// //         handleSeeAllJobs={handleSeeAllJobs}
// //       />

// //       <SuggestedConnections 
// //         suggestedConnections={suggestedConnections}
// //         handleConnect={handleConnect}
// //       />

// //       <LearningRecommendations 
// //         learningRecommendations={learningRecommendations}
// //         handleEnroll={handleEnroll}
// //       />
// //     </aside>
// //   );
// // };

// // export default RightSidebar;

// const RightSidebar = ({ 
//   recommendedJobs, 
//   handleSaveJob, 
//   handleSeeAllJobs,
//   suggestedConnections,
//   handleConnect,
//   learningRecommendations,
//   handleEnroll
// }) => {
//   return (
//     <aside className="hidden lg:block w-80 flex-shrink-0 h-screen overflow-y-auto scroll-smooth px-1">
//       <div className="space-y-6 pb-6">
//         <RecommendedJobs 
//           recommendedJobs={recommendedJobs}
//           handleSaveJob={handleSaveJob}
//           handleSeeAllJobs={handleSeeAllJobs}
//         />

//         <SuggestedConnections 
//           suggestedConnections={suggestedConnections}
//           handleConnect={handleConnect}
//         />

//         <LearningRecommendations 
//           learningRecommendations={learningRecommendations}
//           handleEnroll={handleEnroll}
//         />
//       </div>
//     </aside>
//   );
// };
// export default RightSidebar;

import RecommendedJobs from './RecommendedJobs';
import SuggestedConnections from './SuggestedConnections';
import LearningRecommendations from './LearningRecommendations';

const RightSidebar = ({
  recommendedJobs,
  handleSaveJob,
  handleSeeAllJobs,
  suggestedConnections,
  handleConnect,
  learningRecommendations,
  handleEnroll
}) => {
  return (
    <div className="fixed right-0 top-10">

    <aside className="hidden lg:block w-80 h-screen overflow-y-auto pr-2">
      <div className="space-y-2 pb-10">
        <RecommendedJobs
          recommendedJobs={recommendedJobs}
          handleSaveJob={handleSaveJob}
          handleSeeAllJobs={handleSeeAllJobs}
        />

        <SuggestedConnections
          suggestedConnections={suggestedConnections}
          handleConnect={handleConnect}
        />

        <LearningRecommendations
          learningRecommendations={learningRecommendations}
          handleEnroll={handleEnroll}
          />
      </div>
    </aside>
          </div>
  );
};

export default RightSidebar;
