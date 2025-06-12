import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="flex items-start space-x-6">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-32 h-32 rounded-lg border-4 border-purple-600 object-cover"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <span className={`inline-block mb-4 px-3 py-1 rounded-full text-sm font-semibold ${user.tag === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
              {user.tag}
            </span>
            <div className="space-y-1">
              <p className="text-gray-700"><strong>Phone:</strong> {user.phone || 'N/A'}</p>
              <p className="text-gray-700"><strong>Address:</strong> {user.address || 'N/A'}</p>
              <p className="text-gray-700"><strong>Joined:</strong> {user.joinDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
