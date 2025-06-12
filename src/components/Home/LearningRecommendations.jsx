import { FiBookOpen } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const LearningRecommendations = ({ learningRecommendations, handleEnroll }) => {
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate('/courses');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Learning Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {learningRecommendations.map(item => (
          <Card 
            key={item.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleCardClick(item)}
          >
            <div className="flex items-start space-x-3">
              <FiBookOpen className="text-purple-600 text-xl mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.type} • {item.duration}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click when button is clicked
                    item.type === 'Course' ? handleEnroll(item.id) : console.log(`Read ${item.id}`);
                  }}
                  className={`mt-2 text-sm font-medium px-4 py-1.5 rounded-full ${
                    item.type === 'Course' 
                      ? (item.enrolled ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700') 
                      : (item.read ? 'bg-purple-100 text-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700')
                  } transition-colors duration-200`}
                >
                  {item.type === 'Course' ? (item.enrolled ? 'Enrolled' : 'Enroll now') : (item.read ? 'Read' : 'Read now')}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningRecommendations;