import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../constants/contants';
import { FaHeart, FaBookmark, FaShareAlt, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const SingleArticle = () => {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { articleId } = useParams();

  const markArticleAsRead = async () => {
    try {
      await axios.post(`${base_url}/api/article/read/${articleId}`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Failed to mark the article as read', err);
    }
  };

  const likeArticle = async () => {
    try {
      await axios.put(`${base_url}/api/article/like/${articleId}`, {}, { withCredentials: true });
      setLiked((prevLiked) => !prevLiked);
    } catch (err) {
      console.error('Failed to like the article', err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(`${base_url}/api/article/comment/${articleId}`, { text: newComment }, { withCredentials: true });
      const newCommentObject = {
        text: newComment,
        user: 'Anonymous User',
      };
      setComments((prevComments) => [...prevComments, newCommentObject]);
      setNewComment('');
    } catch (err) {
      console.error('Failed to add comment', err);
    }
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`${base_url}/api/article/get/${articleId}`, { withCredentials: true });
        setArticle(response.data);
        setIsLoading(false);
        setLiked(response.data.liked);
        setComments(response.data.comments || []);
        markArticleAsRead();
      } catch (err) {
        setError('Failed to load the article. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500 text-xl">{error}</p>
        <Link to="/article" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Articles
        </Link>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  const splitIntoParagraphs = (text) => {
    return text.split('\n\n').filter(para => para.trim() !== '');
  };

  const paragraphs = splitIntoParagraphs(article.description);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-12 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <article className="bg-gray-100 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          <div className="p-6 sm:p-10">
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg text-gray-700 font-semibold">Article {article.article}</p>
              <div className="flex space-x-4">
                <button 
                  onClick={likeArticle} 
                  className={`transition-colors duration-300 ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <FaHeart className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => setBookmarked(!bookmarked)} 
                  className={`transition-colors duration-300 ${bookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                >
                  <FaBookmark className="h-6 w-6" />
                </button>
                <button className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                  <FaShareAlt className="h-6 w-6" />
                </button>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 leading-tight">{article.title}</h1>
            <div className="prose max-w-none text-lg text-gray-700">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <React.Fragment key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 px-6 py-4 sm:px-10 sm:py-6 mt-8">
            <p className="text-lg font-semibold text-gray-800 mb-2">Was this article helpful?</p>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-green-500 hover:text-green-600 transition-colors duration-300">
                <FaThumbsUp className="h-6 w-6" />
                <span>Yes</span>
              </button>
              <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 transition-colors duration-300">
                <FaThumbsDown className="h-6 w-6" />
                <span>No</span>
              </button>
            </div>
          </div>
        </article>

        <div className="bg-gray-100 p-6 mt-6 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  {comment.user || 'Anonymous User'}
                </p>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}

          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 bg-white text-gray-900 rounded-lg"
              rows="3"
              placeholder="Write a comment..."
            ></textarea>
            <button
              onClick={addComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Add Comment
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/article"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Back to Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleArticle;
