import { FaFilter, FaRupeeSign, FaMapMarkerAlt, FaClock, FaTag, FaBook, FaRedo, FaLocationArrow } from 'react-icons/fa';

const FilterSidebar = ({ 
  filters, 
  locations, 
  durations, 
  categories, 
  classTypes, 
  distanceOptions,
  locationStatus,
  userLocation,
  handleFilterChange,
  handlePriceChange,
  resetFilters 
}) => {
  return (
    <div className="w-full lg:w-1/4 bg-white p-7 rounded-2xl shadow-xl h-fit sticky top-8 border border-purple-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900 border-b pb-4 border-purple-100">
        <FaFilter className="mr-3 text-purple-600 text-2xl" /> Filter Courses
      </h2>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaRupeeSign className="mr-2 text-green-600" /> Price Range</h3>
        <div className="flex justify-between items-center mb-2 text-gray-700 font-medium">
          <span>NPR {filters.priceRange[0].toLocaleString()}</span>
          <span>NPR {filters.priceRange[1].toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-3">
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer range-sm accent-purple-600 transition-colors duration-200"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer range-sm accent-purple-600 transition-colors duration-200"
          />
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaMapMarkerAlt className="mr-2 text-purple-600" /> Location</h3>
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
        >
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        {filters.location === 'Around Me' && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fade-in">
            <h4 className="font-medium text-base mb-3 text-purple-800 flex items-center">
              <FaLocationArrow className="mr-2 text-purple-600" /> Filter Distance
            </h4>
            {locationStatus === 'loading' && <p className="text-purple-700 text-sm flex items-center"><span className="animate-spin mr-2"><FaClock /></span> Getting your location...</p>}
            {locationStatus === 'error' && <p className="text-red-600 text-sm">Could not get location. Ensure permissions are granted or try another location. 😔</p>}
            {locationStatus === 'success' && userLocation && (
              <>
                <p className="text-purple-700 text-sm mb-2 font-medium">Your location: {userLocation?.lat.toFixed(4)}, {userLocation?.lon.toFixed(4)}</p>
                <select
                  name="maxDistance"
                  value={filters.maxDistance}
                  onChange={handleFilterChange}
                  className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
                >
                  {distanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <p className="text-gray-500 text-xs mt-2 italic">
                  Only courses within this distance will be shown. (Online courses are always displayed)
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaClock className="mr-2 text-purple-600" /> Duration</h3>
        <select
          name="duration"
          value={filters.duration}
          onChange={handleFilterChange}
          className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
        >
          {durations.map(duration => (
            <option key={duration} value={duration}>{duration}</option>
          ))}
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaTag className="mr-2 text-purple-600" /> Category</h3>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Class Type Filter */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaBook className="mr-2 text-purple-600" /> Class Type</h3>
        <select
          name="classType"
          value={filters.classType}
          onChange={handleFilterChange}
          className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
        >
          {classTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <button
        onClick={resetFilters}
        className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-lg"
      >
        <FaRedo className="mr-2.5 text-xl" /> Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;