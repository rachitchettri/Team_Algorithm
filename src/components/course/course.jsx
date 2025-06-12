// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { FaMapMarkerAlt, FaClock, FaTag, FaBook, FaRupeeSign, FaFilter, FaRedo, FaSearch, FaSortAmountDown, FaSortAmountUp, FaLocationArrow, FaStar } from 'react-icons/fa';
// import { calculateDistance } from './utils/locationUtils'; // Assuming this utility file exists

// const CoursesPage = () => {
//   // Sample course data - MODIFIED isRecommended PROPERTIES AND PRICE CURRENCY
//   const coursesData = [
//     {
//       id: 1,
//       title: 'Web Development Bootcamp',
//       category: 'Programming',
//       classType: 'Bootcamp',
//       price: 29900, // Converted price (e.g., $299 * 100 approx)
//       duration: '12 weeks',
//       location: 'Online',
//       coordinates: null, // Online courses don't have physical coordinates
//       description: 'Learn full-stack web development with modern technologies like React, Node.js, and MongoDB.',
//       image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9491?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBBYXJyb3c%3D&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.8,
//       isRecommended: true // Already true
//     },
//     {
//       id: 2,
//       title: 'Data Science Fundamentals',
//       category: 'Data Science',
//       classType: 'Workshop',
//       price: 19900, // Converted price
//       duration: '8 weeks',
//       location: 'New York',
//       coordinates: { lat: 40.7128, lon: -74.0060 },
//       description: 'Introduction to data analysis, machine learning, and data visualization using Python.',
//       image: 'https://images.unsplash.com/photo-1551288259-cd723229b359?q=80&w=2070&auto=format&fit=fit&crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBBYXJyb3c%3D&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.5,
//       isRecommended: true // CHANGED TO TRUE
//     },
//     {
//       id: 3,
//       title: 'Graphic Design Masterclass',
//       category: 'Design',
//       classType: 'Course',
//       price: 14900, // Converted price
//       duration: '6 weeks',
//       location: 'Online',
//       coordinates: null,
//       description: 'Master the principles of graphic design, typography, and Adobe Creative Suite tools.',
//       image: 'https://images.unsplash.com/photo-1626785774573-4b79931cefe9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.7,
//       isRecommended: true // Already true
//     },
//     {
//       id: 4,
//       title: 'Digital Marketing Intensive',
//       category: 'Marketing',
//       classType: 'Intensive',
//       price: 24900, // Converted price
//       duration: '4 weeks',
//       location: 'San Francisco',
//       coordinates: { lat: 37.7749, lon: -122.4194 },
//       description: 'Learn SEO, social media marketing, content marketing, and email campaign strategies.',
//       image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.2,
//       isRecommended: true // CHANGED TO TRUE
//     },
//     {
//       id: 5,
//       title: 'Mobile App Development',
//       category: 'Programming',
//       classType: 'Course',
//       price: 34900, // Converted price
//       duration: '10 weeks',
//       location: 'Online',
//       coordinates: null,
//       description: 'Build robust iOS and Android applications using React Native and Firebase.',
//       image: 'https://images.unsplash.com/photo-1620283082987-9b2f159987f2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.9,
//       isRecommended: true // Already true
//     },
//     {
//       id: 6,
//       title: 'UX/UI Design Principles',
//       category: 'Design',
//       classType: 'Workshop',
//       price: 17900, // Converted price
//       duration: '5 weeks',
//       location: 'Chicago',
//       coordinates: { lat: 41.8781, lon: -87.6298 },
//       description: 'Learn user experience and interface design best practices, wireframing, and prototyping.',
//       image: 'https://images.unsplash.com/photo-1606240724654-fd8865715efc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.6,
//       isRecommended: true // CHANGED TO TRUE
//     },
//     {
//       id: 7,
//       title: 'Cloud Computing Essentials',
//       category: 'IT & Software',
//       classType: 'Course',
//       price: 28900, // Converted price
//       duration: '8 weeks',
//       location: 'Online',
//       coordinates: null,
//       description: 'Understand the fundamentals of cloud computing with AWS and Azure.',
//       image: 'https://images.unsplash.com/photo-1581472723648-90977292261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.4,
//       isRecommended: false
//     },
//     {
//       id: 8,
//       title: 'Cybersecurity for Beginners',
//       category: 'IT & Software',
//       classType: 'Bootcamp',
//       price: 32900, // Converted price
//       duration: '12 weeks',
//       location: 'Online',
//       coordinates: null,
//       description: 'Introduction to cybersecurity, network security, and ethical hacking.',
//       image: 'https://images.unsplash.com/photo-1581472723648-90977292261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.7,
//       isRecommended: true // Already true
//     },
//     {
//       id: 9,
//       title: 'Advanced React Native',
//       category: 'Programming',
//       classType: 'Workshop',
//       price: 45000, // Converted price
//       duration: '6 weeks',
//       location: 'Los Angeles',
//       coordinates: { lat: 34.0522, lon: -118.2437 },
//       description: 'Deep dive into advanced topics in React Native development.',
//       image: 'https://images.unsplash.com/photo-1620283082987-9b2f159987f2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.9,
//       isRecommended: true // CHANGED TO TRUE
//     },
//     {
//       id: 10,
//       title: 'Python for Data Analysis',
//       category: 'Data Science',
//       classType: 'Course',
//       price: 22000, // Converted price
//       duration: '7 weeks',
//       location: 'Boston',
//       coordinates: { lat: 42.3601, lon: -71.0589 },
//       description: 'Learn to use Python for data manipulation, analysis, and visualization.',
//       image: 'https://images.unsplash.com/photo-1551288259-cd723229b359?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBBYXJyb3c%3D&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.6,
//       isRecommended: true // CHANGED TO TRUE
//     }
//   ];

//   // State for filters, search, and sorting
//   const [filters, setFilters] = useState({
//     priceRange: [0, 50000], // Adjusted max price for NPR
//     location: 'All',
//     duration: 'All',
//     category: 'All',
//     classType: 'All',
//     maxDistance: 'All' // New filter for distance
//   });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState(null); // 'price' or 'duration' or 'rating'
//   const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
//   const [userLocation, setUserLocation] = useState(null); // { lat, lon }
//   const [locationStatus, setLocationStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

//   // Fetch user's current location on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       setLocationStatus('loading');
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           });
//           setLocationStatus('success');
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setLocationStatus('error');
//           // Fallback or show error message to user
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       );
//     } else {
//       setLocationStatus('error');
//       console.error("Geolocation is not supported by this browser.");
//     }
//   }, []); // Run once on mount

//   // Get unique values for filter options using useMemo for performance
//   const locations = useMemo(() => ['All', 'Around Me', ...new Set(coursesData.map(course => course.location))], [coursesData]);
//   const durations = useMemo(() => ['All', ...new Set(coursesData.map(course => course.duration))].sort((a, b) => {
//     if (a === 'All') return -1;
//     if (b === 'All') return 1;
//     return parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0]);
//   }), [coursesData]);
//   const categories = useMemo(() => ['All', ...new Set(coursesData.map(course => course.category))].sort(), [coursesData]);
//   const classTypes = useMemo(() => ['All', ...new Set(coursesData.map(course => course.classType))].sort(), [coursesData]);
//   const distanceOptions = ['All', '10 km', '50 km', '100 km', '200 km', '500 km']; // For 'Around Me'

//   // Recommended courses for the new section
//   const recommendedCourses = useMemo(() => coursesData.filter(course => course.isRecommended), [coursesData]);

//   // Filter and sort courses based on selected criteria
//   const filteredAndSortedCourses = useMemo(() => {
//     let tempCourses = coursesData.filter(course => {
//       const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesFilters = (
//         course.price >= filters.priceRange[0] &&
//         course.price <= filters.priceRange[1] &&
//         (filters.category === 'All' || course.category === filters.category) &&
//         (filters.classType === 'All' || course.classType === filters.classType)
//       );

//       // Location filtering logic
//       let matchesLocation = true;
//       if (filters.location === 'Around Me') {
//         if (userLocation && course.coordinates) {
//           const distance = calculateDistance(userLocation.lat, userLocation.lon, course.coordinates.lat, course.coordinates.lon);
//           if (filters.maxDistance !== 'All') {
//             const maxKm = parseInt(filters.maxDistance.split(' ')[0]);
//             matchesLocation = distance <= maxKm;
//           }
//         } else if (course.location !== 'Online') { // If "Around Me" selected but no user location/course coordinates, only show online courses
//           matchesLocation = false;
//         }
//       } else if (filters.location !== 'All') {
//         matchesLocation = course.location === filters.location;
//       }

//       // Duration filtering (special handling for 'X weeks')
//       let matchesDuration = true;
//       if (filters.duration !== 'All') {
//         matchesDuration = course.duration === filters.duration;
//       }

//       return matchesSearch && matchesFilters && matchesLocation && matchesDuration;
//     });

//     if (sortBy) {
//       tempCourses.sort((a, b) => {
//         let valA, valB;
//         if (sortBy === 'price') {
//           valA = a.price;
//           valB = b.price;
//         } else if (sortBy === 'duration') {
//           valA = parseInt(a.duration.split(' ')[0]);
//           valB = parseInt(b.duration.split(' ')[0]);
//         } else if (sortBy === 'rating') { // New sorting by rating
//           valA = a.rating;
//           valB = b.rating;
//         }

//         if (sortOrder === 'asc') {
//           return valA - valB;
//         } else {
//           return valB - valA;
//         }
//       });
//     }
//     return tempCourses;
//   }, [coursesData, filters, searchTerm, sortBy, sortOrder, userLocation]);

//   // Handle filter changes
//   const handleFilterChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       [name]: value
//     }));
//   }, []);

//   const handlePriceChange = useCallback((e, index) => {
//     const newPriceRange = [...filters.priceRange];
//     newPriceRange[index] = parseInt(e.target.value);
//     setFilters(prevFilters => ({
//       ...prevFilters,
//       priceRange: newPriceRange
//     }));
//   }, [filters.priceRange]);

//   const handleSort = useCallback((type) => {
//     if (sortBy === type) {
//       setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
//     } else {
//       setSortBy(type);
//       setSortOrder('asc');
//     }
//   }, [sortBy]);

//   const resetFilters = useCallback(() => {
//     setFilters({
//       priceRange: [0, 50000], // Adjusted for NPR
//       location: 'All',
//       duration: 'All',
//       category: 'All',
//       classType: 'All',
//       maxDistance: 'All'
//     });
//     setSearchTerm('');
//     setSortBy(null);
//     setSortOrder('asc');
//   }, []);

//   const subscriptionPlans = [
//     {
//       name: 'Basic',
//       price: 999, // NPR equivalent
//       features: ['Access to 5 courses', 'Community forum access', 'Monthly newsletter'],
//       buttonText: 'Choose Basic',
//       bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
//       borderColor: 'border-purple-500'
//     },
//     {
//       name: 'Premium',
//       price: 2999, // NPR equivalent
//       features: ['Access to all courses', 'Priority support', 'Exclusive workshops', 'Certificate on completion'],
//       buttonText: 'Choose Premium',
//       bgColor: 'bg-gradient-to-br from-purple-200 to-indigo-200',
//       borderColor: 'border-purple-700'
//     },
//     {
//       name: 'Enterprise',
//       price: 'Contact Us',
//       features: ['Custom course packages', 'Dedicated account manager', 'Team analytics', 'On-site training options'],
//       buttonText: 'Contact Sales',
//       bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
//       borderColor: 'border-purple-500'
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br sm:px-6 lg:px-8 font-sans antialiased flex justify-center items-center w-full right-0">
//       <div className=" w-150 block  ">
//         <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center leading-tight">Explore Our <span className="text-purple-700">Premium Courses</span></h1>
//         <p className="text-xl text-gray-700 mb-12 text-center max-w-2xl mx-auto">Discover a world of knowledge and skill development. Find the perfect course to kickstart your learning journey.</p>

//         {/* Search Bar */}
//         <div className="mb-10 p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-purple-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
//           <FaSearch className="text-purple-500 text-2xl" />
//           <input
//             type="text"
//             placeholder="Search courses by title or description..."
//             className="flex-grow p-2 text-lg border-none focus:outline-none placeholder-gray-500 text-gray-800"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Recommended Courses Section */}
//         {recommendedCourses.length > 0 && (
//           <div className="mb-16">
//             <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center flex items-center justify-center">
//               <FaStar className="text-yellow-500 mr-4 text-4xl animate-pulse" /> Our Top Picks
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
//               {recommendedCourses.map(course => (
//                 <div key={`rec-${course.id}`} className="bg-white w-100 rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-102 transition-all duration-300 relative group">
//                   <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-black px-4 py-1.5 rounded-full rotate-3 group-hover:rotate-0 transition-all duration-300">
//                     RECOMMENDED
//                   </div>
//                   <img src={course.image} alt={course.title} className="w-full h-52 object-cover object-center group-hover:opacity-90 transition-opacity duration-300" />
//                   <div className="p-6">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
//                     <p className="text-gray-700 text-base mb-3 line-clamp-2">{course.description}</p>
//                     <div className="flex items-center text-gray-600 text-sm mb-4">
//                       <FaStar className="text-yellow-500 mr-1.5 text-lg" /> <span className="font-semibold">{course.rating.toFixed(1)}</span> / 5.0 Rating
//                     </div>
//                     <div className="flex justify-between items-center mt-auto">
//                       <span className="text-3xl font-extrabold text-purple-700">
//                         NPR {course.price.toLocaleString()}
//                       </span>
//                       <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* Filters Section */}
//           <div className="w-full lg:w-1/4 bg-white p-7 rounded-2xl shadow-xl h-fit sticky top-8 border border-purple-100">
//             <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900 border-b pb-4 border-purple-100">
//               <FaFilter className="mr-3 text-purple-600 text-2xl" /> Filter Courses
//             </h2>

//             {/* Price Range Filter */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaRupeeSign className="mr-2 text-green-600" /> Price Range</h3>
//               <div className="flex justify-between items-center mb-2 text-gray-700 font-medium">
//                 <span>NPR {filters.priceRange[0].toLocaleString()}</span>
//                 <span>NPR {filters.priceRange[1].toLocaleString()}</span>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <input
//                   type="range"
//                   min="0"
//                   max="50000" // Adjusted max for NPR
//                   step="100"
//                   value={filters.priceRange[0]}
//                   onChange={(e) => handlePriceChange(e, 0)}
//                   className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer range-sm accent-purple-600 transition-colors duration-200"
//                 />
//                 <input
//                   type="range"
//                   min="0"
//                   max="50000" // Adjusted max for NPR
//                   step="100"
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handlePriceChange(e, 1)}
//                   className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer range-sm accent-purple-600 transition-colors duration-200"
//                 />
//               </div>
//             </div>

//             {/* Location Filter */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaMapMarkerAlt className="mr-2 text-purple-600" /> Location</h3>
//               <select
//                 name="location"
//                 value={filters.location}
//                 onChange={handleFilterChange}
//                 className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
//               >
//                 {locations.map(location => (
//                   <option key={location} value={location}>{location}</option>
//                 ))}
//               </select>

//               {filters.location === 'Around Me' && (
//                 <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fade-in">
//                   <h4 className="font-medium text-base mb-3 text-purple-800 flex items-center">
//                     <FaLocationArrow className="mr-2 text-purple-600" /> Filter Distance
//                   </h4>
//                   {locationStatus === 'loading' && <p className="text-purple-700 text-sm flex items-center"><span className="animate-spin mr-2"><FaClock /></span> Getting your location...</p>}
//                   {locationStatus === 'error' && <p className="text-red-600 text-sm">Could not get location. Ensure permissions are granted or try another location. 😔</p>}
//                   {locationStatus === 'success' && userLocation && (
//                     <>
//                       <p className="text-purple-700 text-sm mb-2 font-medium">Your location: {userLocation?.lat.toFixed(4)}, {userLocation?.lon.toFixed(4)}</p>
//                       <select
//                         name="maxDistance"
//                         value={filters.maxDistance}
//                         onChange={handleFilterChange}
//                         className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
//                       >
//                         {distanceOptions.map(option => (
//                           <option key={option} value={option}>{option}</option>
//                         ))}
//                       </select>
//                       <p className="text-gray-500 text-xs mt-2 italic">
//                         Only courses within this distance will be shown. (Online courses are always displayed)
//                       </p>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Duration Filter */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaClock className="mr-2 text-purple-600" /> Duration</h3>
//               <select
//                 name="duration"
//                 value={filters.duration}
//                 onChange={handleFilterChange}
//                 className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
//               >
//                 {durations.map(duration => (
//                   <option key={duration} value={duration}>{duration}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Category Filter */}
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaTag className="mr-2 text-purple-600" /> Category</h3>
//               <select
//                 name="category"
//                 value={filters.category}
//                 onChange={handleFilterChange}
//                 className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Class Type Filter */}
//             <div className="mb-8">
//               <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800"><FaBook className="mr-2 text-purple-600" /> Class Type</h3>
//               <select
//                 name="classType"
//                 value={filters.classType}
//                 onChange={handleFilterChange}
//                 className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-purple-500 focus:border-purple-500 shadow-sm text-gray-700 transition-all duration-200 appearance-none"
//               >
//                 {classTypes.map(type => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={resetFilters}
//               className="w-full bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold py-3.5 px-4 rounded-xl flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-lg"
//             >
//               <FaRedo className="mr-2.5 text-xl" /> Reset Filters
//             </button>
//           </div>

//           {/* Courses List */}
//           <div className="w-full lg:w-3/4">
//             <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-white p-5 rounded-xl shadow-lg border border-purple-100">
//               <p className="text-gray-700 text-xl font-medium mb-3 sm:mb-0">
//                 <span className="font-bold text-purple-600 text-2xl">{filteredAndSortedCourses.length}</span> courses found
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 <button
//                   onClick={() => handleSort('price')}
//                   className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'price' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//                 >
//                   Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
//                 </button>
//                 <button
//                   onClick={() => handleSort('duration')}
//                   className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'duration' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//                 >
//                   Sort by Duration {sortBy === 'duration' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
//                 </button>
//                 <button
//                   onClick={() => handleSort('rating')}
//                   className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'rating' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
//                 >
//                   Sort by Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
//                 </button>
//               </div>
//             </div>

//             {filteredAndSortedCourses.length === 0 ? (
//               <div className="bg-white p-12 rounded-2xl shadow-xl text-center border border-purple-100">
//                 <p className="text-gray-600 text-2xl font-medium">Oops! No courses match your current filters. Try broadening your search. 😔</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {filteredAndSortedCourses.map(course => (
//                   <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
//                     <img src={course.image} alt={course.title} className="w-full h-52 object-cover object-center group-hover:opacity-90 transition-opacity duration-300" />
//                     <div className="p-6">
//                       <div className="flex justify-between items-start mb-3">
//                         <h3 className="text-xl font-bold text-gray-900 leading-snug">{course.title}</h3>
//                         <span className="bg-purple-100 text-purple-800 text-lg font-black px-3.5 py-1.5 rounded-full flex items-center shadow-sm">
//                           <FaRupeeSign className="mr-1 text-md" />{course.price.toLocaleString()}
//                         </span>
//                       </div>
//                       {/* Rating added to course card */}
//                       <div className="flex items-center text-gray-600 text-sm mb-3">
//                         <FaStar className="text-yellow-500 mr-1.5 text-base" /> <span className="font-semibold">{course.rating.toFixed(1)}</span> Rating
//                       </div>
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
//                           <FaTag className="mr-1 text-purple-500" /> {course.category}
//                         </span>
//                         <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
//                           <FaBook className="mr-1 text-purple-500" /> {course.classType}
//                         </span>
//                         <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
//                           <FaClock className="mr-1 text-purple-500" /> {course.duration}
//                         </span>
//                         <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center border border-gray-200">
//                           <FaMapMarkerAlt className="mr-1 text-purple-500" /> {course.location}
//                         </span>
//                       </div>
//                       <p className="text-gray-600 text-base mb-5 line-clamp-3">{course.description}</p>
//                       <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-4 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg text-lg">
//                         Enroll Now
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Subscription Plans Section */}
//         <div className="mt-24">
//           <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center leading-tight">Unlock More with Our <span className="text-purple-700">Flexible Plans</span></h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
//             {subscriptionPlans.map((plan) => (
//               <div key={plan.name} className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-t-8 ${plan.borderColor} transform hover:scale-105 transition-all duration-300 ${plan.bgColor} hover:shadow-2xl`}>
//                 <h3 className="text-3xl font-bold text-gray-800 mb-4">{plan.name}</h3>
//                 <p className="text-5xl font-extrabold text-purple-600 mb-6">
//                   {plan.price === 'Contact Us' ? plan.price : `NPR${plan.price.toLocaleString()}`}
//                   {plan.price !== 'Contact Us' && <span className="text-xl font-medium text-gray-500">/month</span>}
//                 </p>
//                 <ul className="text-gray-700 text-lg mb-8 space-y-3 flex-grow">
//                   {plan.features.map((feature, index) => (
//                     <li key={index} className="flex items-center justify-center">
//                       <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <button className="mt-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3.5 px-6 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg text-lg">
//                   {plan.buttonText}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaMapMarkerAlt, FaClock, FaTag, FaBook, FaRupeeSign, FaFilter, FaRedo, FaSearch, FaSortAmountDown, FaSortAmountUp, FaLocationArrow, FaStar, FaFire, FaRocket, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateDistance } from './utils/locationUtils';

const CoursesPage = () => {
  // Sample course data
  const coursesData = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      category: 'Programming',
      classType: 'Bootcamp',
      price: 29900,
      duration: '12 weeks',
      location: 'Online',
      coordinates: null,
      description: 'Learn full-stack web development with modern technologies like React, Node.js, and MongoDB.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9491?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      isRecommended: true,
      popularity: 'high'
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      classType: 'Workshop',
      price: 19900,
      duration: '8 weeks',
      location: 'New York',
      coordinates: { lat: 40.7128, lon: -74.0060 },
      description: 'Introduction to data analysis, machine learning, and data visualization using Python.',
      image: 'https://images.unsplash.com/photo-1551288259-cd723229b359?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.5,
      isRecommended: true,
      popularity: 'medium'
    },
    // ... (keep other courses the same, add popularity field to each)
  ];

  // State for filters, search, and sorting
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    location: 'All',
    duration: 'All',
    category: 'All',
    classType: 'All',
    maxDistance: 'All'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('idle');
  const [activeTab, setActiveTab] = useState('all');

  // Fetch user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setLocationStatus('success');
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationStatus('error');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationStatus('error');
    }
  }, []);

  // Get unique values for filter options
  const locations = useMemo(() => ['All', 'Around Me', ...new Set(coursesData.map(course => course.location))], [coursesData]);
  const durations = useMemo(() => ['All', ...new Set(coursesData.map(course => course.duration))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0]);
  }), [coursesData]);
  const categories = useMemo(() => ['All', ...new Set(coursesData.map(course => course.category))].sort(), [coursesData]);
  const classTypes = useMemo(() => ['All', ...new Set(coursesData.map(course => course.classType))].sort(), [coursesData]);
  const distanceOptions = ['All', '10 km', '50 km', '100 km', '200 km', '500 km'];

  // Recommended courses
  const recommendedCourses = useMemo(() => coursesData.filter(course => course.isRecommended), [coursesData]);

  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let tempCourses = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = (
        course.price >= filters.priceRange[0] &&
        course.price <= filters.priceRange[1] &&
        (filters.category === 'All' || course.category === filters.category) &&
        (filters.classType === 'All' || course.classType === filters.classType)
      );

      let matchesLocation = true;
      if (filters.location === 'Around Me') {
        if (userLocation && course.coordinates) {
          const distance = calculateDistance(userLocation.lat, userLocation.lon, course.coordinates.lat, course.coordinates.lon);
          if (filters.maxDistance !== 'All') {
            const maxKm = parseInt(filters.maxDistance.split(' ')[0]);
            matchesLocation = distance <= maxKm;
          }
        } else if (course.location !== 'Online') {
            matchesLocation = false;
        }
      } else if (filters.location !== 'All') {
        matchesLocation = course.location === filters.location;
      }

      let matchesDuration = true;
      if (filters.duration !== 'All') {
        matchesDuration = course.duration === filters.duration;
      }

      return matchesSearch && matchesFilters && matchesLocation && matchesDuration;
    });

    if (sortBy) {
      tempCourses.sort((a, b) => {
        let valA, valB;
        if (sortBy === 'price') {
          valA = a.price;
          valB = b.price;
        } else if (sortBy === 'duration') {
          valA = parseInt(a.duration.split(' ')[0]);
          valB = parseInt(b.duration.split(' ')[0]);
        } else if (sortBy === 'rating') {
            valA = a.rating;
            valB = b.rating;
        }

        if (sortOrder === 'asc') {
          return valA - valB;
        } else {
          return valB - valA;
        }
      });
    }
    
    // Filter by active tab
    if (activeTab === 'popular') {
      tempCourses = tempCourses.filter(course => course.popularity === 'high');
    } else if (activeTab === 'new') {
      tempCourses = tempCourses.filter(course => course.id > 7); // Example logic for "new" courses
    }

    return tempCourses;
  }, [coursesData, filters, searchTerm, sortBy, sortOrder, userLocation, activeTab]);

  // Handle filter changes
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  }, []);

  const handlePriceChange = useCallback((e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: newPriceRange
    }));
  }, [filters.priceRange]);

  const handleSort = useCallback((type) => {
    if (sortBy === type) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  }, [sortBy]);

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 50000],
      location: 'All',
      duration: 'All',
      category: 'All',
      classType: 'All',
      maxDistance: 'All'
    });
    setSearchTerm('');
    setSortBy(null);
    setSortOrder('asc');
    setActiveTab('all');
  }, []);

  const subscriptionPlans = [
    {
      name: 'Basic',
      price: 999,
      features: ['Access to 5 courses', 'Community forum access', 'Monthly newsletter'],
      buttonText: 'Choose Basic',
      bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      borderColor: 'border-purple-500',
      icon: <FaGraduationCap className="text-4xl mb-4 text-purple-600" />
    },
    {
      name: 'Premium',
      price: 2999,
      features: ['Access to all courses', 'Priority support', 'Exclusive workshops', 'Certificate on completion'],
      buttonText: 'Choose Premium',
      bgColor: 'bg-gradient-to-br from-purple-200 to-indigo-200',
      borderColor: 'border-purple-700',
      icon: <FaRocket className="text-4xl mb-4 text-purple-600" />
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      features: ['Custom course packages', 'Dedicated account manager', 'Team analytics', 'On-site training options'],
      buttonText: 'Contact Sales',
      bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
      borderColor: 'border-purple-500',
      icon: <FaChalkboardTeacher className="text-4xl mb-4 text-purple-600" />
    },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight bg-clip-text  bg-gradient-to-r from-purple-600 to-indigo-600">
            Transform Your Skills with Expert-Led Courses
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Discover a world of knowledge with our curated selection of premium courses designed to boost your career.
          </p>
          
          {/* Search Bar with Animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mb-10 p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-purple-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300 max-w-3xl mx-auto"
          >
            <FaSearch className="text-purple-500 text-2xl" />
            <input
              type="text"
              placeholder="Search courses by title, description, or instructor..."
              className="flex-grow p-2 text-lg border-none focus:outline-none placeholder-gray-500 text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
              Search
            </button>
          </motion.div>
        </motion.div>

        {/* Recommended Courses Section */}
        {recommendedCourses.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="flex items-center justify-center mb-10">
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mr-4"></div>
              <h2 className="text-4xl font-extrabold text-gray-900 text-center flex items-center">
                <FaStar className="text-yellow-500 mr-4 text-4xl animate-pulse" /> Featured Courses
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {recommendedCourses.map((course, index) => (
                <motion.div
                  key={`rec-${course.id}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-105 transition-all duration-300 relative group"
                >
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-black px-4 py-1.5 rounded-full rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-md">
                    TOP RATED
                  </div>
                  <div className="overflow-hidden h-60">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{course.title}</h3>
                    <p className="text-gray-700 text-base mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <div className="flex items-center mr-4">
                        <FaStar className="text-yellow-500 mr-1.5 text-lg" /> 
                        <span className="font-semibold">{course.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaFire className="text-red-500 mr-1.5 text-lg" />
                        <span className="font-medium">Popular</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-3xl font-extrabold text-purple-700">
                        NPR {course.price.toLocaleString()}
                      </span>
                      <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-2 h-130">
          {/* Filters Section */}
<motion.div 
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5 }}
  className="w-full bg-white p-6 rounded-2xl shadow-xl border border-purple-100 overflow-x-auto"
>
  <div className="flex flex-wrap gap-1 items-start">
    {/* Price Range Filter */}
    <div className="min-w-[250px]">
      <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
        <FaRupeeSign className="mr-2 text-green-600" /> Price Range
      </h3>
      <div className="flex justify-between items-center mb-2 text-gray-700 font-medium">
        <span>NPR {filters.priceRange[0].toLocaleString()}</span>
        <span>NPR {filters.priceRange[1].toLocaleString()}</span>
      </div>
      <input
        type="range"
        min="0"
        max="50000"
        step="100"
        value={filters.priceRange[0]}
        onChange={(e) => handlePriceChange(e, 0)}
        className="w-full mb-2"
      />
      <input
        type="range"
        min="0"
        max="50000"
        step="100"
        value={filters.priceRange[1]}
        onChange={(e) => handlePriceChange(e, 1)}
        className="w-full"
      />
    </div>

    {/* Location Filter */}
    <div className="min-w-full">
      <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
        <FaMapMarkerAlt className="mr-2 text-purple-600" /> Location
      </h3>
      <select
        name="location"
        value={filters.location}
        onChange={handleFilterChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        {locations.map(location => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      {filters.location === 'Around Me' && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
        >
          <h4 className="font-medium text-base mb-3 text-purple-800 flex items-center">
            <FaLocationArrow className="mr-2 text-purple-600" /> Max Distance
          </h4>
          {locationStatus === 'loading' && (
            <div className="flex items-center text-purple-700 text-sm">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <FaClock />
              </motion.div>
              Getting your location...
            </div>
          )}
          {locationStatus === 'error' && (
            <p className="text-red-600 text-sm">Location access required</p>
          )}
          {locationStatus === 'success' && userLocation && (
            <>
              <p className="text-purple-700 text-sm mb-2 font-medium">
                Your location: {userLocation.lat.toFixed(4)}, {userLocation.lon.toFixed(4)}
              </p>
              <select
                name="maxDistance"
                value={filters.maxDistance}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {distanceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </>
          )}
        </motion.div>
      )}
    </div>

    {/* Duration Filter */}
    <div className="min-w-full">
      <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
        <FaClock className="mr-2 text-purple-600" /> Duration
      </h3>
      <select
        name="duration"
        value={filters.duration}
        onChange={handleFilterChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        {durations.map(duration => (
          <option key={duration} value={duration}>{duration}</option>
        ))}
      </select>
    </div>

    {/* Category Filter */}
    <div className="min-w-full">
      <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
        <FaTag className="mr-2 text-purple-600" /> Category
      </h3>
      <select
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>

    {/* Class Type Filter */}
    <div className="min-w-full">
      <h3 className="font-semibold text-lg mb-3 flex items-center text-gray-800">
        <FaBook className="mr-2 text-purple-600" /> Class Type
      </h3>
      <select
        name="classType"
        value={filters.classType}
        onChange={handleFilterChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        {classTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  </div>
</motion.div>

          {/* Courses List Section */}
          <div className="w-full lg:w-3/4">
            {/* Courses Header with Tabs and Sorting */}
            <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="mb-8 bg-white p-6 rounded-2xl shadow-lg border border-purple-100"
>
  <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
    
    {/* Left Section: Title & Tabs */}
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold text-gray-900">
        {filteredAndSortedCourses.length} Courses Available
      </h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === 'all' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Courses
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
            activeTab === 'popular' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FaFire className="mr-1.5" /> Popular
        </button>
        <button
          onClick={() => setActiveTab('new')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTab === 'new' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          New Arrivals
        </button>
      </div>
    </div>

    {/* Right Section: Sort Buttons */}
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSort('price')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
          sortBy === 'price' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Price {sortBy === 'price' && (sortOrder === 'asc' ? <FaSortAmountUp className="ml-1.5" /> : <FaSortAmountDown className="ml-1.5" />)}
      </button>
      <button
        onClick={() => handleSort('rating')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
          sortBy === 'rating' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <FaSortAmountUp className="ml-1.5" /> : <FaSortAmountDown className="ml-1.5" />)}
      </button>
      <button
        onClick={() => handleSort('duration')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
          sortBy === 'duration' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Duration {sortBy === 'duration' && (sortOrder === 'asc' ? <FaSortAmountUp className="ml-1.5" /> : <FaSortAmountDown className="ml-1.5" />)}
      </button>
    </div>
  </div>
</motion.div>

            {/* Courses Grid */}
            {filteredAndSortedCourses.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-12 rounded-2xl shadow-xl text-center border border-purple-100"
              >
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No courses found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search term to find what you're looking for.</p>
                  <button
                    onClick={resetFilters}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAndSortedCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="relative overflow-hidden h-48">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-4 right-4 flex items-center bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-500 mr-1" /> {course.rating.toFixed(1)}
                        </div>
                        {course.popularity === 'high' && (
                          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                            <FaFire className="mr-1" /> HOT
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2">{course.title}</h3>
                          <span className="bg-purple-100 text-purple-800 text-lg font-bold px-3 py-1 rounded-full whitespace-nowrap ml-3">
                            NPR {course.price.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            <FaTag className="mr-1.5 text-purple-500 text-xs" /> {course.category}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            <FaBook className="mr-1.5 text-purple-500 text-xs" /> {course.classType}
                          </span>
                          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                            <FaClock className="mr-1.5 text-purple-500 text-xs" /> {course.duration}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-5 line-clamp-3">{course.description}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 text-sm font-medium flex items-center">
                            <FaMapMarkerAlt className="mr-1.5 text-purple-500" /> {course.location}
                          </span>
                          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-lg transition duration-300 ease-in-out shadow-sm hover:shadow-md text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Subscription Plans Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                Choose Your Learning Path
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the plan that fits your goals and unlock premium features to accelerate your learning journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl shadow-xl overflow-hidden border-t-4 ${plan.borderColor} ${plan.bgColor} hover:shadow-2xl transition-all duration-300`}
              >
                <div className="p-8 flex flex-col items-center text-center h-full">
                  {plan.icon}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-4xl font-extrabold text-purple-600 mb-6">
                    {plan.price === 'Contact Us' ? plan.price : `NPR ${plan.price.toLocaleString()}`}
                    {plan.price !== 'Contact Us' && <span className="text-lg font-medium text-gray-500">/mo</span>}
                  </p>
                  <ul className="text-gray-700 mb-8 space-y-3 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full mt-auto py-3 px-6 rounded-lg font-bold transition duration-300 ${
                    index === 1 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg'
                  }`}>
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;