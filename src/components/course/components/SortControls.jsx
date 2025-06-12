import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const SortControls = ({ sortBy, sortOrder, handleSort }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleSort('price')}
        className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'price' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Sort by Price {sortBy === 'price' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
      </button>
      <button
        onClick={() => handleSort('duration')}
        className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'duration' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Sort by Duration {sortBy === 'duration' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
      </button>
      <button
        onClick={() => handleSort('rating')}
        className={`px-5 py-2.5 rounded-full font-medium text-sm transition duration-300 flex items-center ${sortBy === 'rating' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Sort by Rating {sortBy === 'rating' && (sortOrder === 'asc' ? <FaSortAmountUp className="inline ml-2" /> : <FaSortAmountDown className="inline ml-2" />)}
      </button>
    </div>
  );
};

export default SortControls;