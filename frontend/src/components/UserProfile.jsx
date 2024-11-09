import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../constants/contants';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/api/user/profile`, {
            withCredentials: true, 
          });
          setUserProfile(response.data);
          setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-white">Loading...</div>;

  if (!userProfile) return <div className="flex justify-center items-center h-screen text-xl text-white">No user data found.</div>;

  return (
    <div className="min-h-screen bg-gray-900 py-10 pt-20">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 h-40">
          <div className="h-full flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">{userProfile.username}'s Profile</h1>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* User Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1">
              <h2 className="text-xl font-semibold text-white">User Information</h2>
              <div className="mt-4 space-y-2">
                <p className="text-gray-300"><span className="font-medium">Username:</span> {userProfile.username}</p>
                <p className="text-gray-300"><span className="font-medium">Email:</span> {userProfile.email}</p>
              </div>
            </div>
            
            {/* Performance Section */}
            <div className="col-span-1">
              <h2 className="text-xl font-semibold text-white">Performance Report</h2>
              <div className="mt-4">
                <p className="text-gray-300"><span className="font-medium">Read Articles:</span> {userProfile.readCount} / {userProfile.totalArticles}</p>
                <div className="w-full bg-gray-700 rounded-full mt-2">
                  <div className="bg-indigo-500 text-xs font-medium text-black text-center p-1 leading-none rounded-full" 
                       style={{ width: `${userProfile.readPercentage}%` }}>
                    {userProfile.readPercentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Articles List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-white mb-4">Read Articles</h2>
            <ul className="space-y-3">
              {userProfile.readArticles.map(article => (
                <li key={article._id} className="bg-gray-700 p-4 rounded-lg shadow-sm hover:bg-gray-600 transition">
                  <p className="text-gray-300 font-medium"><span className="text-indigo-400">Article {article.article}:</span> {article.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
