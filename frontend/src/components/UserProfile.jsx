import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../constants/contants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${base_url}/api/user/profile`, { withCredentials: true });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      // Make a POST request to the correct logout endpoint
      await axios.post(`${base_url}/api/logout`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,  // Retrieve the token from the cookie
        },
        withCredentials: true, // Ensure the cookie is sent with the request
      });
  
      // Clear the token from the cookies after logout
      Cookies.remove('token');  // Remove the token cookie
      navigate('/login');       // Redirect the user to the login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl text-gray-800">Loading...</div>;

  if (!userProfile) return <div className="flex justify-center items-center h-screen text-xl text-gray-800">No user data found.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 pt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section with Logout Button */}
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-teal-500 h-40 px-6">
          <h1 className="text-3xl font-bold text-white">{userProfile.username}'s Profile</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* User Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
              <div className="mt-4 space-y-2">
                <p className="text-gray-700"><span className="font-medium">Username:</span> {userProfile.username}</p>
                <p className="text-gray-700"><span className="font-medium">Email:</span> {userProfile.email}</p>
              </div>
            </div>
            
            {/* Performance Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Performance Report</h2>
              <div className="mt-4">
                <p className="text-gray-700"><span className="font-medium">Read Articles:</span> {userProfile.readCount} / {userProfile.totalArticles}</p>
                <div className="w-full bg-gray-300 rounded-full mt-2">
                  <div className="bg-teal-500 text-xs font-medium text-white text-center p-1 leading-none rounded-full" 
                       style={{ width: `${userProfile.readPercentage}%` }}>
                    {userProfile.readPercentage?.toFixed(2) || 0}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Read Articles List */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Read Articles</h2>
            <ul className="space-y-3">
              {userProfile.readArticles?.length ? (
                userProfile.readArticles.map((article) => (
                  <li key={article._id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition">
                    <p className="text-gray-700 font-medium"><span className="text-blue-600">Article {article.article}:</span> {article.title}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">You haven’t read any articles yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
