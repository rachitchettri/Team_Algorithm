
// import React, { useState, useEffect, useMemo, useCallback } from 'react'
// import { Card } from "@/components/ui/card"
// import { CardContent } from "@/components/ui/card"
// import { CardHeader } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select } from "@/components/ui/select"
//  // Adjust import path based on your setup
// import {
//   FaMapMarkerAlt,
//   FaClock,
//   FaTag,
//   FaBook,
//   FaRupeeSign,
//   FaFilter,
//   FaRedo,
//   FaSearch,
//   FaSortAmountDown,
//   FaSortAmountUp,
//   FaLocationArrow,
//   FaStar,
//   FaFire,
//   FaRocket,
//   FaGraduationCap,
//   FaChalkboardTeacher,
// } from 'react-icons/fa'
// import { motion } from 'framer-motion'
// import { calculateDistance } from './utils/locationUtils'

// const CoursesPage = () => {

//   const [selectedCourse, setSelectedCourse] = useState(null);
// const [open, setOpen] = useState(false);

// const handleViewDetails = (course) => {
//   setSelectedCourse(course);
//   setOpen(true);
// };


//   // Sample course data
//   const coursesData = [
//     {
//       id: 1,
//       title: 'Web Development Bootcamp',
//       category: 'Programming',
//       classType: 'Bootcamp',
//       price: 29900,
//       duration: '12 weeks',
//       location: 'Online',
//       coordinates: null,
//       description:
//         'Learn full-stack web development with modern technologies like React, Node.js, and MongoDB.',
//       image:
//         'https://images.unsplash.com/photo-1542831371-29b0f74f9491?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.8,
//       isRecommended: true,
//       popularity: 'high',
//     },
//     {
//       id: 2,
//       title: 'Data Science Fundamentals',
//       category: 'Data Science',
//       classType: 'Workshop',
//       price: 19900,
//       duration: '8 weeks',
//       location: 'New York',
//       coordinates: { lat: 40.7128, lon: -74.0060 },
//       description:
//         'Introduction to data analysis, machine learning, and data visualization using Python.',
//       image:
//         'https://images.unsplash.com/photo-1551288259-cd723229b359?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//       rating: 4.5,
//       isRecommended: true,
//       popularity: 'medium',
//     },
//     // ... add other courses similarly
//   ]

//   // State for filters, search, sorting, location, tabs
//   const [filters, setFilters] = useState({
//     priceRange: [0, 50000],
//     location: 'All',
//     duration: 'All',
//     category: 'All',
//     classType: 'All',
//     maxDistance: 'All',
//   })
//   const [searchTerm, setSearchTerm] = useState('')
//   const [sortBy, setSortBy] = useState(null)
//   const [sortOrder, setSortOrder] = useState('asc')
//   const [userLocation, setUserLocation] = useState(null)
//   const [locationStatus, setLocationStatus] = useState('idle')
//   const [activeTab, setActiveTab] = useState('all')

//   // Fetch user's current location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       setLocationStatus('loading')
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           })
//           setLocationStatus('success')
//         },
//         (error) => {
//           console.error('Error getting location:', error)
//           setLocationStatus('error')
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
//       )
//     } else {
//       setLocationStatus('error')
//     }
//   }, [])

//   // Extract unique filter options
//   const locations = useMemo(
//     () => [
//       'All',
//       'Around Me',
//       ...new Set(coursesData.map((course) => course.location)),
//     ],
//     [coursesData]
//   )
//   const durations = useMemo(
//     () =>
//       ['All', ...new Set(coursesData.map((course) => course.duration))].sort(
//         (a, b) => {
//           if (a === 'All') return -1
//           if (b === 'All') return 1
//           return parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0])
//         }
//       ),
//     [coursesData]
//   )
//   const categories = useMemo(
//     () => ['All', ...new Set(coursesData.map((course) => course.category))].sort(),
//     [coursesData]
//   )
//   const classTypes = useMemo(
//     () => ['All', ...new Set(coursesData.map((course) => course.classType))].sort(),
//     [coursesData]
//   )
//   const distanceOptions = ['All', '10 km', '50 km', '100 km', '200 km', '500 km']

//   // Recommended courses
//   const recommendedCourses = useMemo(
//     () => coursesData.filter((course) => course.isRecommended),
//     [coursesData]
//   )

//   // Filter & sort logic
//   const filteredAndSortedCourses = useMemo(() => {
//     let tempCourses = coursesData.filter((course) => {
//       const matchesSearch =
//         course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchTerm.toLowerCase())

//       const matchesFilters =
//         course.price >= filters.priceRange[0] &&
//         course.price <= filters.priceRange[1] &&
//         (filters.category === 'All' || course.category === filters.category) &&
//         (filters.classType === 'All' || course.classType === filters.classType)

//       let matchesLocation = true
//       if (filters.location === 'Around Me') {
//         if (userLocation && course.coordinates) {
//           const distance = calculateDistance(
//             userLocation.lat,
//             userLocation.lon,
//             course.coordinates.lat,
//             course.coordinates.lon
//           )
//           if (filters.maxDistance !== 'All') {
//             const maxKm = parseInt(filters.maxDistance.split(' ')[0])
//             matchesLocation = distance <= maxKm
//           }
//         } else if (course.location !== 'Online') {
//           matchesLocation = false
//         }
//       } else if (filters.location !== 'All') {
//         matchesLocation = course.location === filters.location
//       }

//       let matchesDuration = true
//       if (filters.duration !== 'All') {
//         matchesDuration = course.duration === filters.duration
//       }

//       return (
//         matchesSearch && matchesFilters && matchesLocation && matchesDuration
//       )
//     })

//     if (sortBy) {
//       tempCourses.sort((a, b) => {
//         let valA, valB
//         if (sortBy === 'price') {
//           valA = a.price
//           valB = b.price
//         } else if (sortBy === 'duration') {
//           valA = parseInt(a.duration.split(' ')[0])
//           valB = parseInt(b.duration.split(' ')[0])
//         } else if (sortBy === 'rating') {
//           valA = a.rating
//           valB = b.rating
//         }

//         if (sortOrder === 'asc') {
//           return valA - valB
//         } else {
//           return valB - valA
//         }
//       })
//     }

//     // Filter by active tab
//     if (activeTab === 'popular') {
//       tempCourses = tempCourses.filter((course) => course.popularity === 'high')
//     } else if (activeTab === 'new') {
//       tempCourses = tempCourses.filter((course) => course.id > 7) // example logic
//     }

//     return tempCourses
//   }, [
//     coursesData,
//     filters,
//     searchTerm,
//     sortBy,
//     sortOrder,
//     userLocation,
//     activeTab,
//   ])

//   // Handlers
//   const handleFilterChange = useCallback((e) => {
//     const { name, value } = e.target
//     setFilters((prev) => ({ ...prev, [name]: value }))
//   }, [])

//   const handlePriceChange = useCallback((e, index) => {
//     const newRange = [...filters.priceRange]
//     newRange[index] = parseInt(e.target.value)
//     setFilters((prev) => ({ ...prev, priceRange: newRange }))
//   }, [filters.priceRange])

//   const handleSort = useCallback((type) => {
//     if (sortBy === type) {
//       setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
//     } else {
//       setSortBy(type)
//       setSortOrder('asc')
//     }
//   }, [sortBy])

//   const resetFilters = useCallback(() => {
//     setFilters({
//       priceRange: [0, 50000],
//       location: 'All',
//       duration: 'All',
//       category: 'All',
//       classType: 'All',
//       maxDistance: 'All',
//     })
//     setSearchTerm('')
//     setSortBy(null)
//     setSortOrder('asc')
//     setActiveTab('all')
//   }, [])

//   // Data for the subscription plans (unchanged)
//   const subscriptionPlans = [
//     {
//       name: 'Basic',
//       price: 999,
//       features: [
//         'Access to 5 courses',
//         'Community forum access',
//         'Monthly newsletter',
//       ],
//       buttonText: 'Choose Basic',
//       bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
//       borderColor: 'border-purple-500',
//       icon: <FaGraduationCap className="text-4xl mb-4 text-purple-600" />,
//     },
//     {
//       name: 'Premium',
//       price: 2999,
//       features: [
//         'Access to all courses',
//         'Priority support',
//         'Exclusive workshops',
//         'Certificate on completion',
//       ],
//       buttonText: 'Choose Premium',
//       bgColor: 'bg-gradient-to-br from-purple-200 to-indigo-200',
//       borderColor: 'border-purple-700',
//       icon: <FaRocket className="text-4xl mb-4 text-purple-600" />,
//     },
//     {
//       name: 'Enterprise',
//       price: 'Contact Us',
//       features: [
//         'Custom course packages',
//         'Dedicated account manager',
//         'Team analytics',
//         'On-site training options',
//       ],
//       buttonText: 'Contact Sales',
//       bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
//       borderColor: 'border-purple-500',
//       icon: <FaChalkboardTeacher className="text-4xl mb-4 text-purple-600" />,
//     },
//   ]

//   // Animation variants
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br px-4 sm:px-6 lg:px-8 font-sans antialiased">
//       {/* Container */}
//       <div className="max-w-7xl mx-auto py-12">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <h1 className="text-5xl font-extrabold mb-4 leading-tight bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">
//             Transform Your Skills with Expert-Led Courses
//           </h1>
//           <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
//             Discover a world of knowledge with our curated selection of
//             premium courses designed to boost your career.
//           </p>
//           {/* Search */}
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className="mx-auto max-w-3xl p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-purple-200 transition-all duration-300"
//           >
//             <FaSearch className="text-purple-500 text-2xl" />
//             <Input
//               placeholder="Search courses..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex-grow border-none focus:outline-none placeholder-gray-500 text-gray-800 text-lg"
//             />
//             <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
//               Search
//             </Button>
//           </motion.div>
//         </motion.div>

//         {/* Recommended Courses */}
//         {recommendedCourses.length > 0 && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-20">
//             {/* Header */}
//             <div className="flex items-center justify-center mb-10">
//               <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mr-4"></div>
//               <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
//                 <FaStar className="text-yellow-500 mr-4 text-4xl animate-pulse" /> Featured Courses
//               </h2>
//               <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full ml-4"></div>
//             </div>
//             {/* Courses Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {recommendedCourses.map((course, index) => (
//                 <motion.div
//                   key={course.id}
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-105 transition-all duration-300 relative group"
//                 >
//                   {/* Badge */}
//                   <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-black px-4 py-1.5 rounded-full rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-md">
//                     TOP RATED
//                   </div>
//                   {/* Image */}
//                   <div className="overflow-hidden h-60">
//                     <img src={course.image} alt={course.title} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
//                   </div>
//                   {/* Content */}
//                   <div className="p-6 flex flex-col justify-between h-full">
//                     <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
//                     <p className="text-gray-700 text-base mb-3 line-clamp-2">{course.description}</p>
//                     <div className="flex items-center space-x-4 text-sm mb-4 text-gray-600">
//                       <div className="flex items-center">
//                         <FaStar className="text-yellow-500 mr-1.5" /> {course.rating.toFixed(1)}
//                       </div>
//                       <div className="flex items-center">
//                         <FaFire className="text-red-500 mr-1.5" /> Popular
//                       </div>
//                     </div>
//                     <div className="flex justify-between items-center mt-auto">
//                       <span className="text-3xl font-extrabold text-purple-700">NPR {course.price.toLocaleString()}</span>
//                       <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
//                         Enroll Now
//                       </Button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>
//         )}

//         {/* Main Content: Sidebar + Courses */}
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Filters Sidebar */}
//           <Card className="w-full md:w-64 p-6 rounded-2xl shadow-xl border border-purple-100">
//             {/* Filters Content */}
//             <div className="flex flex-col gap-4">
//               {/* Price Range */}
//               <div>
//                 <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
//                   <FaRupeeSign className="mr-2 text-green-600" /> Price Range
//                 </h3>
//                 <div className="flex justify-between mb-2 text-gray-700 font-medium text-sm">
//                   <span>NPR {filters.priceRange[0].toLocaleString()}</span>
//                   <span>NPR {filters.priceRange[1].toLocaleString()}</span>
//                 </div>
//                 <Input
//                   type="range"
//                   min="0"
//                   max="50000"
//                   step="100"
//                   value={filters.priceRange[0]}
//                   onChange={(e) => handlePriceChange(e, 0)}
//                 />
//                 <Input
//                   type="range"
//                   min="0"
//                   max="50000"
//                   step="100"
//                   value={filters.priceRange[1]}
//                   onChange={(e) => handlePriceChange(e, 1)}
//                 />
//               </div>

//               {/* Location Filter */}
//               <div>
//                 <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
//                   <FaMapMarkerAlt className="mr-2 text-purple-600" /> Location
//                 </h3>
//                 <Select
//                   name="location"
//                   value={filters.location}
//                   onChange={handleFilterChange}
//                 >
//                   {locations.map((loc) => (
//                     <option key={loc} value={loc}>
//                       {loc}
//                     </option>
//                   ))}
//                 </Select>
//                 {filters.location === 'Around Me' && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 'auto' }}
//                     transition={{ duration: 0.3 }}
//                     className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg"
//                   >
//                     <h4 className="font-medium text-base mb-3 flex items-center text-purple-800">
//                       <FaLocationArrow className="mr-2 text-purple-600" /> Max Distance
//                     </h4>
//                     {locationStatus === 'loading' && (
//                       <div className="flex items-center text-purple-700 text-sm">
//                         <motion.div
//                           animate={{ rotate: 360 }}
//                           transition={{
//                             duration: 2,
//                             repeat: Infinity,
//                             ease: 'linear',
//                           }}
//                           className="mr-2"
//                         >
//                           <FaClock />
//                         </motion.div>
//                         Getting your location...
//                       </div>
//                     )}
//                     {locationStatus === 'error' && (
//                       <p className="text-red-600 text-sm">Location access required</p>
//                     )}
//                     {locationStatus === 'success' && userLocation && (
//                       <>
//                         <p className="text-purple-700 text-sm mb-2 font-medium">
//                           Your location: {userLocation.lat.toFixed(4)},{' '}
//                           {userLocation.lon.toFixed(4)}
//                         </p>
//                         <Select
//                           name="maxDistance"
//                           value={filters.maxDistance}
//                           onChange={handleFilterChange}
//                         >
//                           {distanceOptions.map((opt) => (
//                             <option key={opt} value={opt}>
//                               {opt}
//                             </option>
//                           ))}
//                         </Select>
//                       </>
//                     )}
//                   </motion.div>
//                 )}
//               </div>

//               {/* Duration Filter */}
//               <div>
//                 <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
//                   <FaClock className="mr-2 text-purple-600" /> Duration
//                 </h3>
//                 <Select
//                   name="duration"
//                   value={filters.duration}
//                   onChange={handleFilterChange}
//                 >
//                   {durations.map((d) => (
//                     <option key={d} value={d}>
//                       {d}
//                     </option>
//                   ))}
//                 </Select>
//               </div>

//               {/* Category Filter */}
//               <div>
//                 <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
//                   <FaTag className="mr-2 text-purple-600" /> Category
//                 </h3>
//                 <Select
//                   name="category"
//                   value={filters.category}
//                   onChange={handleFilterChange}
//                 >
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </Select>
//               </div>

//               {/* Class Type Filter */}
//               <div>
//                 <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
//                   <FaBook className="mr-2 text-purple-600" /> Class Type
//                 </h3>
//                 <Select
//                   name="classType"
//                   value={filters.classType}
//                   onChange={handleFilterChange}
//                 >
//                   {classTypes.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </Select>
//               </div>
//             </div>
//           </Card>

//           {/* Courses List */}
//           <div className="w-full md:w-[calc(100%-16rem)]">
//             {/* Courses Header with Tabs & Sort Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="mb-8 bg-white p-6 rounded-2xl shadow-xl border border-purple-100"
//             >
//               <div className="flex flex-col md:flex-row md:justify-between">
//                 {/* Left: Title & Tabs */}
//                 <div className="flex flex-col gap-4 mb-4 md:mb-0">
//                   <h3 className="text-2xl font-bold text-gray-900">
//                     {filteredAndSortedCourses.length} Courses Available
//                   </h3>
//                   {/* Tabs */}
//                   <div className="flex flex-wrap gap-2">
//                     <Button
//                       variant={activeTab === 'all' ? 'default' : 'outline'}
//                       onClick={() => setActiveTab('all')}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                         activeTab === 'all'
//                           ? 'bg-purple-600 text-white shadow-md'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       All Courses
//                     </Button>
//                     <Button
//                       variant={activeTab === 'popular' ? 'default' : 'outline'}
//                       onClick={() => setActiveTab('popular')}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
//                         activeTab === 'popular'
//                           ? 'bg-purple-600 text-white shadow-md'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       <FaFire className="mr-1.5" /> Popular
//                     </Button>
//                     <Button
//                       variant={activeTab === 'new' ? 'default' : 'outline'}
//                       onClick={() => setActiveTab('new')}
//                       className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//                         activeTab === 'new'
//                           ? 'bg-purple-600 text-white shadow-md'
//                           : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                       }`}
//                     >
//                       New Arrivals
//                     </Button>
//                   </div>
//                 </div>
//                 {/* Right: Sort Buttons */}
//                 <div className="flex flex-wrap gap-2 items-end">
//                   {/* Price */}
//                   <Button
//                     variant={sortBy === 'price' ? 'default' : 'outline'}
//                     onClick={() => handleSort('price')}
//                     className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
//                   >
//                     Price{' '}
//                     {sortBy === 'price' &&
//                       (sortOrder === 'asc' ? (
//                         <FaSortAmountUp className="ml-1.5" />
//                       ) : (
//                         <FaSortAmountDown className="ml-1.5" />
//                       ))}
//                   </Button>
//                   {/* Rating */}
//                   <Button
//                     variant={sortBy === 'rating' ? 'default' : 'outline'}
//                     onClick={() => handleSort('rating')}
//                     className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
//                   >
//                     Rating{' '}
//                     {sortBy === 'rating' &&
//                       (sortOrder === 'asc' ? (
//                         <FaSortAmountUp className="ml-1.5" />
//                       ) : (
//                         <FaSortAmountDown className="ml-1.5" />
//                       ))}
//                   </Button>
//                   {/* Duration */}
//                   <Button
//                     variant={sortBy === 'duration' ? 'default' : 'outline'}
//                     onClick={() => handleSort('duration')}
//                     className="px-4 py-2 rounded-full text-sm font-medium flex items-center"
//                   >
//                     Duration{' '}
//                     {sortBy === 'duration' &&
//                       (sortOrder === 'asc' ? (
//                         <FaSortAmountUp className="ml-1.5" />
//                       ) : (
//                         <FaSortAmountDown className="ml-1.5" />
//                       ))}
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Courses Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {filteredAndSortedCourses.map((course, index) => (
//                 <motion.div
//                   key={course.id}
//                   variants={cardVariants}
//                   initial="hidden"
//                   animate="visible"
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                 >
//                   {/* Course Card using shadcn/ui Card */}
//                   <Card className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 group">
//                     {/* Image */}
//                     <div className="relative h-60 overflow-hidden">
//                       <img
//                         src={course.image}
//                         alt={course.title}
//                         className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//                       />
//                       {/* Rating badge */}
//                       <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
//                         <FaStar className="text-yellow-500 mr-1.5" /> {course.rating.toFixed(1)}
//                       </div>
//                       {course.popularity === 'high' && (
//                         <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-xs font-semibold shadow-md">
//                           <FaFire className="mr-1" /> HOT
//                         </div>
//                       )}
//                     </div>
//                     {/* Content */}
//                     <div className="p-6 flex flex-col justify-between h-full">
//                       {/* Title & Price */}
//                       <div className="flex justify-between items-start mb-4">
//                         <h3 className="text-xl font-semibold">{course.title}</h3>
//                         <span className="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ml-3">
//                           NPR {course.price.toLocaleString()}
//                         </span>
//                       </div>
//                       {/* Course Info */}
//                       <CardContent className="p-0 mb-4 space-y-2">
//                         <div className="flex flex-wrap gap-2 text-xs text-gray-700">
//                           <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                             <FaTag className="mr-1.5 text-purple-500" /> {course.category}
//                           </span>
//                           <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                             <FaBook className="mr-1.5 text-purple-500" /> {course.classType}
//                           </span>
//                           <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
//                             <FaClock className="mr-1.5 text-purple-500" /> {course.duration}
//                           </span>
//                         </div>
//                         {/* Description */}
//                         <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
//                       </CardContent>
//                       {/* Location & Button */}
//                       <div className="flex justify-between items-center mt-4">
//                         <div className="flex items-center text-sm text-gray-700">
//                           <FaMapMarkerAlt className="mr-1.5 text-purple-500" /> {course.location}
//                         </div>
//                         <Button
//   onClick={() => handleViewDetails(course)}
//   className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-sm"
// >
//   View Details
// </Button>

//                       </div>
//                     </div>
//                   </Card>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// {selectedCourse && (
//   <Dialog open={open} onOpenChange={setOpen}>
//     <DialogContent className="max-w-2xl p-6">
//       <DialogHeader>
//         <DialogTitle className="text-xl font-bold">{selectedCourse.title}</DialogTitle>
//       </DialogHeader>

//       <img
//         src={selectedCourse.image}
//         alt={selectedCourse.title}
//         className="w-full h-64 object-cover rounded-lg mb-4"
//       />

//       <div className="space-y-2">
//         <p className="text-sm text-gray-700">
//           <strong>Description:</strong> {selectedCourse.description}
//         </p>
//         <p className="text-sm text-gray-700">
//           <strong>Category:</strong> {selectedCourse.category}
//         </p>
//         <p className="text-sm text-gray-700">
//           <strong>Class Type:</strong> {selectedCourse.classType}
//         </p>
//         <p className="text-sm text-gray-700">
//           <strong>Duration:</strong> {selectedCourse.duration}
//         </p>
//         <p className="text-sm text-gray-700">
//           <strong>Location:</strong> {selectedCourse.location}
//         </p>
//         <p className="text-sm text-purple-700 font-semibold">
//           <strong>Price:</strong> NPR {selectedCourse.price.toLocaleString()}
//         </p>
//       </div>

//       {/* Payment CTA */}
//       <div className="mt-6 flex justify-end">
//         <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium">
//           Proceed to Payment
//         </Button>
//       </div>
//     </DialogContent>
//   </Dialog>
// )}


// export default CoursesPage

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  FaMapMarkerAlt,
  FaClock,
  FaTag,
  FaBook,
  FaRupeeSign,
  FaFilter,
  FaRedo,
  FaSearch,
  FaSortAmountDown,
  FaSortAmountUp,
  FaLocationArrow,
  FaStar,
  FaFire,
  FaRocket,
  FaGraduationCap,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import { calculateDistance } from './utils/locationUtils'

const CoursesPage = () => {
  // State for selected course modal
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [open, setOpen] = useState(false)

  const handleViewDetails = (course) => {
    setSelectedCourse(course)
    setOpen(true)
  }

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
      description:
        'Learn full-stack web development with modern technologies like React, Node.js, and MongoDB.',
      image:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9491?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.8,
      isRecommended: true,
      popularity: 'high',
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
      description:
        'Introduction to data analysis, machine learning, and data visualization using Python.',
      image:
        'https://images.unsplash.com/photo-1551288259-cd723229b359?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      rating: 4.5,
      isRecommended: true,
      popularity: 'medium',
    },
    // Add other courses similarly...
  ]

  // State for filters, search, sorting, location, tabs
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    location: 'All',
    duration: 'All',
    category: 'All',
    classType: 'All',
    maxDistance: 'All',
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const [activeTab, setActiveTab] = useState('all')

  // Fetch user's location
  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('loading')
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude })
          setLocationStatus('success')
        },
        (err) => {
          console.error('Error getting location:', err)
          setLocationStatus('error')
        },
        { enableHighAccuracy: true, timeout: 10000 }
      )
    } else {
      setLocationStatus('error')
    }
  }, [])

  // Unique options for filters
  const locations = useMemo(
    () => ['All', 'Around Me', ...new Set(coursesData.map(c => c.location))],
    [coursesData]
  )
  const durations = useMemo(
    () =>
      ['All', ...new Set(coursesData.map(c => c.duration))].sort((a, b) => {
        if (a === 'All') return -1
        if (b === 'All') return 1
        return parseInt(a.split(' ')[0]) - parseInt(b.split(' ')[0])
      }),
    [coursesData]
  )
  const categories = useMemo(() => ['All', ...new Set(coursesData.map(c => c.category))].sort(), [coursesData])
  const classTypes = useMemo(() => ['All', ...new Set(coursesData.map(c => c.classType))].sort(), [coursesData])
  const distanceOptions = ['All', '10 km', '50 km', '100 km', '200 km', '500 km']

  // Recommended courses
  const recommendedCourses = useMemo(() => coursesData.filter(c => c.isRecommended), [coursesData])

  // Filtering & sorting logic
  const filteredCourses = useMemo(() => {
    let temp = coursesData.filter(c => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilters =
        c.price >= filters.priceRange[0] &&
        c.price <= filters.priceRange[1] &&
        (filters.category === 'All' || c.category === filters.category) &&
        (filters.classType === 'All' || c.classType === filters.classType)

      let matchesLocation = true
      if (filters.location === 'Around Me') {
        if (userLocation && c.coordinates) {
          const dist = calculateDistance(userLocation.lat, userLocation.lon, c.coordinates.lat, c.coordinates.lon)
          if (filters.maxDistance !== 'All') {
            const maxKm = parseInt(filters.maxDistance.split(' ')[0])
            matchesLocation = dist <= maxKm
          }
        } else if (c.location !== 'Online') {
          matchesLocation = false
        }
      } else if (filters.location !== 'All') {
        matchesLocation = c.location === filters.location
      }

      let matchesDuration = true
      if (filters.duration !== 'All') {
        matchesDuration = c.duration === filters.duration
      }

      return matchesSearch && matchesFilters && matchesLocation && matchesDuration
    })

    if (sortBy) {
      temp.sort((a, b) => {
        let valA, valB
        if (sortBy === 'price') {
          valA = a.price
          valB = b.price
        } else if (sortBy === 'duration') {
          valA = parseInt(a.duration.split(' ')[0])
          valB = parseInt(b.duration.split(' ')[0])
        } else if (sortBy === 'rating') {
          valA = a.rating
          valB = b.rating
        }
        return sortOrder === 'asc' ? valA - valB : valB - valA
      })
    }

    if (activeTab === 'popular') {
      temp = temp.filter(c => c.popularity === 'high')
    } else if (activeTab === 'new') {
      temp = temp.filter(c => c.id > 7) // example logic
    }

    return temp
  }, [coursesData, filters, searchTerm, sortBy, sortOrder, userLocation, activeTab])

  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }, [])

  const handlePriceChange = useCallback((e, index) => {
    const newRange = [...filters.priceRange]
    newRange[index] = parseInt(e.target.value)
    setFilters(prev => ({ ...prev, priceRange: newRange }))
  }, [filters.priceRange])

  const handleSort = useCallback((type) => {
    if (sortBy === type) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(type)
      setSortOrder('asc')
    }
  }, [sortBy])

  const resetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 50000],
      location: 'All',
      duration: 'All',
      category: 'All',
      classType: 'All',
      maxDistance: 'All',
    })
    setSearchTerm('')
    setSortBy(null)
    setSortOrder('asc')
    setActiveTab('all')
  }, [])

  // Render
 return (
  <div className="min-h-screen bg-gradient-to-br px-4 sm:px-6 lg:px-8 font-sans antialiased">
    <div className="max-w-7xl mx-auto py-12">
      
      {/* Hero & Search */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 leading-tight bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent">
          Transform Your Skills with Expert-Led Courses
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover a world of knowledge with our curated selection of premium courses designed to boost your career.
        </p>
        {/* Search bar */}
        <motion.div className="mx-auto max-w-3xl p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-purple-200 transition-all duration-300"
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        >
          <FaSearch className="text-purple-500 text-2xl" />
          <Input placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 border-none focus:outline-none placeholder-gray-500 text-gray-800 text-lg" />
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">Search</Button>
        </motion.div>
      </motion.div>

      {/* Featured Courses */}
      {recommendedCourses.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-20">
          {/* Header */}
          <div className="flex items-center justify-center mb-10">
            <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mr-4"></div>
            <h2 className="text-4xl font-extrabold text-gray-900 flex items-center">
              <FaStar className="text-yellow-500 mr-4 text-4xl animate-pulse" /> Featured Courses
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full ml-4"></div>
          </div>
          {/* Courses grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendedCourses.map((course, index) => (
              <motion.div key={course.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:scale-105 transition-all duration-300 relative group">
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 text-sm font-black px-4 py-1.5 rounded-full rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-md">TOP RATED</div>
                {/* Image */}
                <div className="overflow-hidden h-60">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500" />
                </div>
                {/* Content */}
                <div className="p-6 flex flex-col justify-between h-full">
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-700 text-base mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center space-x-4 text-sm mb-4 text-gray-600">
                    <div className="flex items-center"><FaStar className="text-yellow-500 mr-1.5" /> {course.rating.toFixed(1)}</div>
                    <div className="flex items-center"><FaFire className="text-red-500 mr-1.5" /> Popular</div>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-3xl font-extrabold text-purple-700">NPR {course.price.toLocaleString()}</span>
                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">Enroll Now</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content: Filters + Course List */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <Card className="w-full md:w-64 p-6 rounded-2xl shadow-xl border border-purple-100">
          {/* Filters Content */}
          <div className="flex flex-col gap-4">
            {/* Price Range */}
            <div>
              <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                <FaRupeeSign className="mr-2 text-green-600" /> Price Range
              </h3>
              <div className="flex justify-between mb-2 text-gray-700 font-medium text-sm">
                <span>NPR {filters.priceRange[0].toLocaleString()}</span>
                <span>NPR {filters.priceRange[1].toLocaleString()}</span>
              </div>
              <Input type="range" min="0" max="50000" step="100" value={filters.priceRange[0]} onChange={(e) => handlePriceChange(e, 0)} />
              <Input type="range" min="0" max="50000" step="100" value={filters.priceRange[1]} onChange={(e) => handlePriceChange(e, 1)} />
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                <FaMapMarkerAlt className="mr-2 text-purple-600" /> Location
              </h3>
              <Select name="location" value={filters.location} onChange={handleFilterChange}>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </Select>
              {filters.location === 'Around Me' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-base mb-3 flex items-center text-purple-800">
                    <FaLocationArrow className="mr-2 text-purple-600" /> Max Distance
                  </h4>
                  {locationStatus === 'loading' && (
                    <div className="flex items-center text-purple-700 text-sm">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="mr-2"><FaClock /></motion.div>
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
                      <Select name="maxDistance" value={filters.maxDistance} onChange={handleFilterChange}>
                        {distanceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Select>
                    </>
                  )}
                </motion.div>
              )}
            </div>

            {/* Duration Filter */}
            <div>
              <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                <FaClock className="mr-2 text-purple-600" /> Duration
              </h3>
              <Select name="duration" value={filters.duration} onChange={handleFilterChange}>
                {durations.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Select>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                <FaTag className="mr-2 text-purple-600" /> Category
              </h3>
              <Select name="category" value={filters.category} onChange={handleFilterChange}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
            </div>

            {/* Class Type Filter */}
            <div>
              <h3 className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                <FaBook className="mr-2 text-purple-600" /> Class Type
              </h3>
              <Select name="classType" value={filters.classType} onChange={handleFilterChange}>
                {classTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        {/* Courses List */}
        <div className="w-full md:w-[calc(100%-16rem)]">
          {/* Header: Tabs & Sorting */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 bg-white p-6 rounded-2xl shadow-xl border border-purple-100">
            <div className="flex flex-col md:flex-row md:justify-between">
              {/* Tabs */}
              <div className="flex flex-col gap-4 mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900">{filteredCourses.length} Courses Available</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant={activeTab==='all'?'default':'outline'} onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab==='all'?'bg-purple-600 text-white shadow-md':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All Courses</Button>
                  <Button variant={activeTab==='popular'?'default':'outline'} onClick={() => setActiveTab('popular')} className={`px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-200 ${activeTab==='popular'?'bg-purple-600 text-white shadow-md':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}><FaFire className="mr-1.5" />Popular</Button>
                  <Button variant={activeTab==='new'?'default':'outline'} onClick={() => setActiveTab('new')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeTab==='new'?'bg-purple-600 text-white shadow-md':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>New Arrivals</Button>
                </div>
              </div>
              {/* Sorting Buttons */}
              <div className="flex flex-wrap gap-2 items-end">
                <Button variant={sortBy==='price'?'default':'outline'} onClick={() => handleSort('price')} className="px-4 py-2 rounded-full text-sm font-medium flex items-center">Price {sortBy==='price'?(sortOrder==='asc'?<FaSortAmountUp className="ml-1.5" />:<FaSortAmountDown className="ml-1.5" />):null}</Button>
                <Button variant={sortBy==='rating'?'default':'outline'} onClick={() => handleSort('rating')} className="px-4 py-2 rounded-full text-sm font-medium flex items-center">Rating {sortBy==='rating'?(sortOrder==='asc'?<FaSortAmountUp className="ml-1.5" />:<FaSortAmountDown className="ml-1.5" />):null}</Button>
                <Button variant={sortBy==='duration'?'default':'outline'} onClick={() => handleSort('duration')} className="px-4 py-2 rounded-full text-sm font-medium flex items-center">Duration {sortBy==='duration'?(sortOrder==='asc'?<FaSortAmountUp className="ml-1.5" />:<FaSortAmountDown className="ml-1.5" />):null}</Button>
              </div>
            </div>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div key={course.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: index * 0.1 }}>
                <Card className="overflow-hidden rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300 group">
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                    {/* Ratings badge */}
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-md">
                      <FaStar className="text-yellow-500 mr-1.5" /> {course.rating.toFixed(1)}
                    </div>
                    {course.popularity==='high' && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-xs font-semibold shadow-md"><FaFire className="mr-1" /> HOT</div>
                    )}
                  </div>
                  {/* Course Info */}
                  <div className="p-6 flex flex-col justify-between h-full">
                    {/* Title & Price */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <span className="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap ml-3">NPR {course.price.toLocaleString()}</span>
                    </div>
                    {/* Details */}
                    <CardContent className="p-0 mb-4 space-y-2">
                      <div className="flex flex-wrap gap-2 text-xs text-gray-700">
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><FaTag className="mr-1.5 text-purple-500" /> {course.category}</span>
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><FaBook className="mr-1.5 text-purple-500" /> {course.classType}</span>
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full"><FaClock className="mr-1.5 text-purple-500" /> {course.duration}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-3">{course.description}</p>
                    </CardContent>
                    {/* Location & Button */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm text-gray-700">
                        <FaMapMarkerAlt className="mr-1.5 text-purple-500" /> {course.location}
                      </div>
                      <Button onClick={() => handleViewDetails(course)} className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 font-semibold text-sm">View Details</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Details Dialog */}
      {selectedCourse && (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-xl rounded-2xl shadow-2xl border bg-white border-gray-200 p-6">
      <div className="space-y-5">
        {/* Title & Category */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            <FaTag className="inline mr-1 text-purple-500" />
            {selectedCourse.category} &middot; {selectedCourse.classType}
          </p>
        </div>

        {/* Rating & Hot Badge */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center text-sm text-yellow-600 font-semibold bg-yellow-100 px-3 py-1 rounded-full">
            <FaStar className="mr-1" />
            {selectedCourse.rating.toFixed(1)} Rating
          </div>
          {selectedCourse.popularity === 'high' && (
            <div className="flex items-center text-sm text-white bg-red-500 px-3 py-1 rounded-full">
              <FaFire className="mr-1" /> HOT COURSE
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center">
            <FaClock className="text-purple-600 mr-2" />
            Duration: {selectedCourse.duration}
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-purple-600 mr-2" />
            Location: {selectedCourse.location}
          </div>
          <div className="flex items-center">
            <FaBook className="text-purple-600 mr-2" />
            Class Type: {selectedCourse.classType}
          </div>
          <div className="flex items-center">
            <FaTag className="text-purple-600 mr-2" />
            Category: {selectedCourse.category}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-600 leading-relaxed">{selectedCourse.description}</p>
        </div>

        {/* Price and Button */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-purple-700">
            NPR {selectedCourse.price.toLocaleString()}
          </span>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-sm font-semibold">
            Proceed to Payment
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
)}


    </div>
  </div>
)
}

export default CoursesPage