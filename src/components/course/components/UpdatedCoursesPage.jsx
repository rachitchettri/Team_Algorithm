// CoursesPage.js
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { calculateDistance } from './utils/locationUtils';
import HeaderSection from './components/HeaderSection/HeaderSection';
import SearchBar from './components/SearchBar/SearchBar';
import RecommendedCourses from './components/RecommendedCourses/RecommendedCourses';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import SortControls from './components/SortControls/SortControls';
import CourseCard from './components/CourseCard/CourseCard';
import SubscriptionPlans from './components/SubscriptionPlans/SubscriptionPlans';
import styles from './CoursesPage.module.css';
import RegisterCheckPage from './registercheck';

const CoursesPage = () => {
  // State Management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState('requesting');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    locations: [],
    priceRange: [0, 100000],
    duration: [],
    classType: [],
    rating: 0,
    level: [],
    distance: null,
    startDate: '',
    endDate: ''
  });

  // Sample data - Replace with API calls
  const coursesData = [
    {
      id: 1,
      title: 'Full Stack Web Development Bootcamp',
      instructor: 'John Smith',
      category: 'Programming',
      price: 45000,
      originalPrice: 60000,
      rating: 4.8,
      reviewCount: 245,
      duration: '12 weeks',
      level: 'Beginner',
      location: 'Kathmandu',
      coordinates: { lat: 27.7172, lng: 85.3240 },
      classType: 'In-Person',
      image: '/api/placeholder/400/300',
      description: 'Learn full-stack development from scratch with hands-on projects.',
      startDate: '2025-07-01',
      students: 1250,
      featured: true,
      tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
      provider: 'TechAcademy Nepal'
    },
    {
      id: 2,
      title: 'Digital Marketing Mastery',
      instructor: 'Sarah Johnson',
      category: 'Marketing',
      price: 25000,
      originalPrice: 35000,
      rating: 4.6,
      reviewCount: 189,
      duration: '8 weeks',
      level: 'Intermediate',
      location: 'Pokhara',
      coordinates: { lat: 28.2096, lng: 83.9856 },
      classType: 'Online',
      image: '/api/placeholder/400/300',
      description: 'Master digital marketing strategies and tools.',
      startDate: '2025-06-15',
      students: 890,
      featured: false,
      tags: ['SEO', 'Social Media', 'Google Ads', 'Analytics'],
      provider: 'Digital Nepal Institute'
    },
    {
      id: 3,
      title: 'Graphic Design Fundamentals',
      instructor: 'Michael Chen',
      category: 'Design',
      price: 30000,
      originalPrice: 40000,
      rating: 4.7,
      reviewCount: 156,
      duration: '10 weeks',
      level: 'Beginner',
      location: 'Lalitpur',
      coordinates: { lat: 27.6588, lng: 85.3247 },
      classType: 'Hybrid',
      image: '/api/placeholder/400/300',
      description: 'Learn design principles and master Adobe Creative Suite.',
      startDate: '2025-06-20',
      students: 675,
      featured: true,
      tags: ['Photoshop', 'Illustrator', 'InDesign', 'Typography'],
      provider: 'Creative Arts Academy'
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'Dr. Priya Sharma',
      category: 'Data Science',
      price: 55000,
      originalPrice: 70000,
      rating: 4.9,
      reviewCount: 312,
      duration: '16 weeks',
      level: 'Advanced',
      location: 'Bhaktapur',
      coordinates: { lat: 27.6710, lng: 85.4298 },
      classType: 'In-Person',
      image: '/api/placeholder/400/300',
      description: 'Complete data science program with real-world projects.',
      startDate: '2025-07-15',
      students: 425,
      featured: true,
      tags: ['Python', 'Machine Learning', 'Pandas', 'Visualization'],
      provider: 'Data Science Institute'
    },
    {
      id: 5,
      title: 'English Language Proficiency',
      instructor: 'Emma Thompson',
      category: 'Language',
      price: 15000,
      originalPrice: 20000,
      rating: 4.5,
      reviewCount: 298,
      duration: '6 weeks',
      level: 'All Levels',
      location: 'Kathmandu',
      coordinates: { lat: 27.7172, lng: 85.3240 },
      classType: 'Online',
      image: '/api/placeholder/400/300',
      description: 'Improve your English speaking, writing, and comprehension skills.',
      startDate: '2025-06-10',
      students: 1500,
      featured: false,
      tags: ['IELTS', 'TOEFL', 'Business English', 'Conversation'],
      provider: 'Language Excellence Center'
    }
  ];

  // Static data arrays
  const locations = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Chitwan', 'Butwal'];
  const durations = ['4 weeks', '6 weeks', '8 weeks', '10 weeks', '12 weeks', '16 weeks'];
  const categories = ['Programming', 'Marketing', 'Design', 'Data Science', 'Language', 'Business'];
  const classTypes = ['Online', 'In-Person', 'Hybrid'];
  const distanceOptions = [
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '25 km', value: 25 },
    { label: '50 km', value: 50 }
  ];

  // Subscription plans data
  const subscriptionPlans = [
    {
      name: 'Basic',
      price: 999,
      originalPrice: 1499,
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      icon: '📚',
      features: [
        'Access to 50+ courses',
        'Basic course materials',
        'Community forum access',
        'Email support',
        'Course completion certificates'
      ],
      buttonText: 'Start Learning',
      popular: false
    },
    {
      name: 'Premium',
      price: 1999,
      originalPrice: 2999,
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      icon: '🚀',
      features: [
        'Access to 200+ courses',
        'Premium course materials',
        'Live sessions with instructors',
        'Priority support',
        'Downloadable resources',
        'Career guidance',
        'Project reviews'
      ],
      buttonText: 'Go Premium',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Contact Us',
      borderColor: 'border-gold-500',
      bgColor: 'bg-yellow-50',
      iconBg: 'bg-yellow-100',
      icon: '👑',
      features: [
        'Unlimited course access',
        'Custom learning paths',
        'Dedicated account manager',
        '24/7 phone support',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  // Get user location on component mount
  useEffect(() => {
    const getUserLocation = () => {
      if ('geolocation' in navigator) {
        setLocationStatus('requesting');
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
            setLocationStatus('granted');
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationStatus('denied');
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
      } else {
        setLocationStatus('unavailable');
      }
    };

    getUserLocation();
  }, []);

  // Load courses data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses(coursesData);
      } catch (err) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Filter change handler
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  }, []);

  // Price change handler
  const handlePriceChange = useCallback((priceRange) => {
    setFilters(prev => ({
      ...prev,
      priceRange
    }));
  }, []);

  // Sort handler
  const handleSort = useCallback((newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  }, []);

  // Reset filters
  const resetFilters = useCallback(() => {
    setFilters({
      categories: [],
      locations: [],
      priceRange: [0, 100000],
      duration: [],
      classType: [],
      rating: 0,
      level: [],
      distance: null,
      startDate: '',
      endDate: ''
    });
    setSearchTerm('');
  }, []);

  // Memoized filtered and sorted courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      // Search term filter
      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !course.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(course.category)) {
        return false;
      }

      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(course.location)) {
        return false;
      }

      // Price range filter
      if (course.price < filters.priceRange[0] || course.price > filters.priceRange[1]) {
        return false;
      }

      // Duration filter
      if (filters.duration.length > 0 && !filters.duration.includes(course.duration)) {
        return false;
      }

      // Class type filter
      if (filters.classType.length > 0 && !filters.classType.includes(course.classType)) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && course.rating < filters.rating) {
        return false;
      }

      // Level filter
      if (filters.level.length > 0 && !filters.level.includes(course.level)) {
        return false;
      }

      // Distance filter
      if (filters.distance && userLocation && course.coordinates) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          course.coordinates.lat,
          course.coordinates.lng
        );
        if (distance > filters.distance) {
          return false;
        }
      }

      return true;
    });

    // Sort courses
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = a.rating - b.rating;
          break;
        case 'duration':
          // Extract numeric value from duration string
          const aDuration = parseInt(a.duration.split(' ')[0]);
          const bDuration = parseInt(b.duration.split(' ')[0]);
          comparison = aDuration - bDuration;
          break;
        case 'students':
          comparison = a.students - b.students;
          break;
        case 'startDate':
          comparison = new Date(a.startDate) - new Date(b.startDate);
          break;
        case 'relevance':
        default:
          // Featured courses first, then by rating
          if (a.featured && !b.featured) comparison = -1;
          else if (!a.featured && b.featured) comparison = 1;
          else comparison = b.rating - a.rating;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [courses, searchTerm, filters, sortBy, sortOrder, userLocation]);

  // Recommended courses (featured courses with high ratings)
  const recommendedCourses = useMemo(() => {
    return courses
      .filter(course => course.featured && course.rating >= 4.5)
      .slice(0, 4);
  }, [courses]);

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading amazing courses for you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.errorContainer}>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <HeaderSection />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {recommendedCourses.length > 0 && (
          <RecommendedCourses 
            recommendedCourses={recommendedCourses}
            handleSaveCourse={(courseId) => {
              // Handle saving course functionality
              console.log('Saving course:', courseId);
            }}
            handleSeeAllCourses={() => {
              // Scroll to courses section or navigate
              document.querySelector(`.${styles.coursesSection}`)?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          />
        )}

        <div className={styles.mainContent}>
          <FilterSidebar
            filters={filters}
            locations={locations}
            durations={durations}
            categories={categories}
            classTypes={classTypes}
            distanceOptions={distanceOptions}
            locationStatus={locationStatus}
            userLocation={userLocation}
            handleFilterChange={handleFilterChange}
            handlePriceChange={handlePriceChange}
            resetFilters={resetFilters}
          />

          <div className={styles.coursesSection}>
            <div className={styles.coursesHeader}>
              <p className={styles.coursesCount}>
                <span className={styles.countNumber}>{filteredAndSortedCourses.length}</span> 
                {filteredAndSortedCourses.length === 1 ? ' course' : ' courses'} found
                {searchTerm && <span className={styles.searchIndicator}> for "{searchTerm}"</span>}
              </p>
              <SortControls 
                sortBy={sortBy} 
                sortOrder={sortOrder} 
                handleSort={handleSort} 
              />
            </div>

            {filteredAndSortedCourses.length === 0 ? (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3>No courses found</h3>
                <p>
                  {searchTerm 
                    ? `No courses match "${searchTerm}". Try different keywords or check your filters.`
                    : 'No courses match your current filters. Try broadening your search.'
                  }
                </p>
                <button onClick={resetFilters} className={styles.clearFiltersButton}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={styles.coursesGrid}>
                {filteredAndSortedCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course}
                    userLocation={userLocation}
                    onSave={(courseId) => {
                      // Handle saving course
                      console.log('Saving course:', courseId);
                    }}
                    onEnroll={(courseId) => {
                      // Handle course enrollment
                      console.log('Enrolling in course:', courseId);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <SubscriptionPlans plans={subscriptionPlans} />
      </div>
      
    </div>
  );
};

export default CoursesPage;