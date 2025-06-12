import { FaStar } from 'react-icons/fa';
import CourseCard from './CourseCard';

const RecommendedCourses = ({ recommendedCourses }) => {
  return (
    <div className="mb-16">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center flex items-center justify-center">
        <FaStar className="text-yellow-500 mr-4 text-4xl animate-pulse" /> Our Top Picks
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {recommendedCourses.map(course => (
          <div key={`rec-${course.id}`} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-102 transition-all duration-300 relative group">
            <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-black px-4 py-1.5 rounded-full rotate-3 group-hover:rotate-0 transition-all duration-300">
              RECOMMENDED
            </div>
            <img src={course.image} alt={course.title} className="w-full h-52 object-cover object-center group-hover:opacity-90 transition-opacity duration-300" />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
              <p className="text-gray-700 text-base mb-3 line-clamp-2">{course.description}</p>
              <div className="flex items-center text-gray-600 text-sm mb-4">
                <FaStar className="text-yellow-500 mr-1.5 text-lg" /> <span className="font-semibold">{course.rating.toFixed(1)}</span> / 5.0 Rating
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-3xl font-extrabold text-purple-700">
                  NPR {course.price.toLocaleString()}
                </span>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;