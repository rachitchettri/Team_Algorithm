import React, { useState } from "react";
import {
  FaUserCircle,
  FaVideo,
  FaRegNewspaper,
  FaLightbulb,
  FaHeart,
  FaComment,
  FaShareAlt,
  FaFilter,
  FaImages,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

const posts = [
  {
    id: 1,
    user: "Rachit Chettri",
    type: "news",
    content: "Apple announces the new M5 chip with groundbreaking performance.",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    user: "Priya Shah",
    type: "video",
    content: "React Server Components Explained in 5 Minutes",
    timestamp: "1 hour ago",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 3,
    user: "Aryan Thapa",
    type: "knowledge",
    content: "Did you know TypeScript improves large codebase maintainability?",
    timestamp: "30 minutes ago",
  },
];

const PostTypeIcon = ({ type }) => {
  switch (type) {
    case "news":
      return <FaRegNewspaper className="text-blue-600" />;
    case "video":
      return <FaVideo className="text-red-500" />;
    case "knowledge":
      return <FaLightbulb className="text-yellow-400" />;
    default:
      return null;
  }
};

const PostActions = () => (
  <div className="flex space-x-6 mt-2 text-gray-500">
    <button className="flex items-center space-x-1 hover:text-red-500">
      <FaHeart /> <span>Like</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-blue-500">
      <FaComment /> <span>Comment</span>
    </button>
    <button className="flex items-center space-x-1 hover:text-green-500">
      <FaShareAlt /> <span>Share</span>
    </button>
  </div>
);

const PostCard = ({ user, type, content, timestamp, videoUrl }) => (
  <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
    <div className="flex items-start space-x-4">
      <FaUserCircle className="text-4xl text-gray-500" />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h2 className="font-semibold text-gray-800">{user}</h2>
          <PostTypeIcon type={type} />
          <span className="text-sm text-gray-400">{timestamp}</span>
        </div>
        <p className="text-gray-700 mt-1">{content}</p>
        {type === "video" && videoUrl && (
          <video
            className="w-full h-64 mt-2 rounded-lg object-cover"
            controls
            src={videoUrl}
          />
        )}
        <PostActions />
      </div>
    </div>
  </div>
);

const PostInput = () => (
  <div className="bg-white rounded-2xl shadow p-4 mb-4">
    <textarea
      placeholder="Share your tech knowledge, news, or video link..."
      className="w-full h-24 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <div className="flex justify-between mt-2">
      <div className="flex items-center space-x-2 text-gray-600">
        <FaImages className="text-lg" />
        <span>Add Media</span>
      </div>
      <Button className="bg-blue-600 text-white hover:bg-blue-700">Post</Button>
    </div>
  </div>
);

const FilterTabs = ({ current, onChange }) => (
  <div className="flex justify-center space-x-4 mb-6 text-gray-600">
    {['all', 'news', 'video', 'knowledge'].map((type) => (
      <button
        key={type}
        className={`px-4 py-2 rounded-full font-medium hover:bg-blue-100 transition ${
          current === type ? 'bg-blue-600 text-white' : ''
        }`}
        onClick={() => onChange(type)}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ))}
  </div>
);

const Network = () => {
  const [filter, setFilter] = useState("all");

  const filteredPosts =
    filter === "all" ? posts : posts.filter((post) => post.type === filter);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Tech Network</h1>
      <PostInput />
      <FilterTabs current={filter} onChange={setFilter} />
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Network;