import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-10 p-4 bg-white rounded-xl shadow-lg flex items-center space-x-4 border border-purple-200 focus-within:ring-2 focus-within:ring-purple-500 transition-all duration-300">
      <FaSearch className="text-purple-500 text-2xl" />
      <input
        type="text"
        placeholder="Search courses by title or description..."
        className="flex-grow p-2 text-lg border-none focus:outline-none placeholder-gray-500 text-gray-800"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;