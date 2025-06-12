import RecommendedJobs from './RecommendedJobs';
import SuggestedConnections from './SuggestedConnections';
import LearningRecommendations from './LearningRecommendations';
import Card from './Card';

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
    <aside className="hidden lg:block w-80 flex-shrink-0">
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
    </aside>
  );
};

export default RightSidebar;