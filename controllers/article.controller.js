import Article from '../models/article.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

// Create an article (admin only)
export const createArticle = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create an article'));
  }
  if (!req.body.article || !req.body.title || !req.body.description) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }

  const newArticle = new Article({
    article: req.body.article,
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    next(error);
  }
};

// Get all articles with pagination (article number, title, and _id only)
export const getAllArticles = async (req, res, next) => {
    try {
      // Get the page number from query params, or set default to 1
      const page = parseInt(req.query.page) || 1;
      const limit = 50; // Set a fixed limit of 50 articles per page
  
      // Calculate how many documents to skip
      const skip = (page - 1) * limit;
  
      // Fetch total number of articles first
      const totalArticles = await Article.countDocuments();
  
      // If there are no articles at all, return early
      if (totalArticles === 0) {
        return res.status(200).json({
          message: "No articles found",
          articles: [],
          currentPage: page,
          totalPages: 0,
          totalArticles: 0,
          hasNextPage: false,
          hasPrevPage: false
        });
      }
  
      // Calculate total pages
      const totalPages = Math.ceil(totalArticles / limit);
  
      // Fetch articles with pagination
      const articles = await Article.find({})
        .select('_id article title') // Select only _id, article, and title fields
        .sort({ article: 1 }) 
        .skip(skip)
        .limit(limit)
        .lean() 
        .exec();
  
      const paginationInfo = {
        currentPage: page,
        totalPages: totalPages,
        totalArticles: totalArticles,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      };
  
      res.status(200).json({
        articles,
        ...paginationInfo
      });
    } catch (error) {
      next(error);
    }
  };
  

export const getSingleArticle = async (req, res, next) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return next(errorHandler(404, 'Article not found'));
        }

        res.status(200).json(article);
        console.log(req.user);
    } catch (error) {
        next(error);
    }
};

export const updateReadArticle = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user.readArticles.includes(req.params.articleId)) {
            user.readArticles.push(req.params.articleId);
            await user.save();

            return res.status(200).json({ message: 'Article added to read list' });
        }

        res.status(200).json({ message: 'Article already in read list' });
    } catch (error) {
        next(error);
    }
};





export const updateArticle = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to update this article'));
  }
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.articleId,
      {
        $set: {
          article: req.body.article,
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    next(error);
  }
};



export const likeArticle = async (req, res, next) => {
  try {
      const article = await Article.findById(req.params.articleId);
      if (!article) {
          return next(errorHandler(404, 'Article not found'));
      }

      if (article.likes.includes(req.user.id)) {
          article.likes.pull(req.user.id);
          await article.save();
          return res.status(200).json({ message: 'Article unliked' });
      }

      article.likes.push(req.user.id);
      await article.save();

      res.status(200).json({ message: 'Article liked' });
  } catch (error) {
      next(error);
  }
};


export const commentOnArticle = async (req, res, next) => {
  try {
      const article = await Article.findById(req.params.articleId);
      if (!article) {
          return next(errorHandler(404, 'Article not found'));
      }

      const comment = {
          userId: req.user.id,
          text: req.body.text
      };

      article.comments.push(comment);
      await article.save();

      res.status(201).json({ message: 'Comment added' });
  } catch (error) {
      next(error);
  }
};



export const getLikeStatus = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;  

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    const liked = article.likes.includes(userId);

    return res.status(200).json({ liked });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get like status', error: err });
  }
};

export const getComments = async (req, res) => {
  try {
    const { articleId } = req.params;

    const article = await Article.findById(articleId).populate('comments.userId', 'username');  

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({ comments: article.comments });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to get comments', error: err });
  }
};