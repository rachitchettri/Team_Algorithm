import { FiPlus } from 'react-icons/fi';
import Card from './Card';

const SuggestedConnections = ({ suggestedConnections, handleConnect }) => {
  return (
    <Card className="p-6 sticky top-[500px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Suggested Connections</h3>
        <button className="text-sm text-purple-600 font-semibold hover:underline hover:text-purple-800 transition-colors duration-200">See all</button>
      </div>
      <div className="space-y-4">
        {suggestedConnections.map(connection => (
          <div key={connection.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <img
                src={connection.avatar}
                alt={connection.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-purple-300"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{connection.name}</h4>
                <p className="text-sm text-gray-500">{connection.title}</p>
                <p className="text-xs text-purple-600">{connection.mutualConnections} mutual connections</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect(connection.id)}
              className={`p-2 rounded-full transition-all duration-200 ${connection.connected ? 'bg-purple-100 text-purple-700' : 'text-purple-700 hover:bg-purple-100'}`}
            >
              {connection.connected ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <FiPlus className="text-xl" />
              )}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SuggestedConnections;