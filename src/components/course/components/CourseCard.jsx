import { FaRupeeSign, FaStar, FaTag, FaBook, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <img src={course.image} alt={course.title} className="w-full h-52 object-cover object-center group-hover:opacity-90 transition-opacity duration-300" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 leading-snug">{course.title}</h3>
          <span className="bg-purple-100 text-purple-800 text-lg font-black px-3.5 py-1.5 rounded-full flex items-center shadow-sm">
            <FaRupeeSign className="mr-1 text-md" />{course.price.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaStar className="text-yellow-500 mr-1.5 text-base" /> <span className="font-semibold">{course.rating.toFixed(1)}</span> Rating
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
            <FaTag className="mr-1 text-purple-500" /> {course.category}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
            <FaBook className="mr-1 text-purple-500" /> {course.classType}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
            <FaClock className="mr-1 text-purple-500" /> {course.duration}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
            <FaMapMarkerAlt className="mr-1 text-purple-500" /> {course.location}
          </span>
        </div>
        <p className="text-gray-600 text-base mb-5 line-clamp-3">{course.description}</p>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-lg">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;