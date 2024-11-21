/**
 * Main server configuration file
 * Sets up Express server with MongoDB connection, middleware, and routes
 * Implements error handling and CORS configuration
 */

// Import required dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

// Import route handlers
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import newsRoutes from './routes/news.route.js';
import quizRoutes from './routes/quiz.route.js';
import articleRoutes from './routes/article.route.js';
import chatRoute from './routes/chat.route.js';

// Load environment variables
dotenv.config();

/**
 * Database Configuration
 * Establishes connection to MongoDB using environment variables
 * Implements error handling for connection failures
 */
class DatabaseConnection {
  static async initialize() {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connection established successfully');
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      console.error('Please check your connection settings and ensure MongoDB is running.');
      process.exit(1); // Exit process with failure
    }
  }
}

/**
 * Server Configuration
 * Sets up Express application with necessary middleware and routes
 */
class Server {
  constructor() {
    this.app = express();
    this.serverPort = process.env.PORT || 3000;
    this.dirname = path.resolve();

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * Configure and apply middleware
   */
  setupMiddleware() {
    // Configure CORS
    const corsOptions = {
      origin: ['*','https://abhishek12221732.github.io', 'http://localhost:3000', 'https://law-aware.onrender.com/'], // Add localhost for testing
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    };
    this.app.use(cors(corsOptions));

    // Parse cookies and JSON bodies
    this.app.use(cookieParser());
    this.app.use(
      bodyParser.json({
        limit: '50mb',
      })
    );
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
      })
    );

    // Serve static files if React is built in the same project
    this.app.use(express.static(path.join(this.dirname, 'frontend', 'build')));
  }

  /**
   * Set up API routes
   */
  setupRoutes() {
    // API Routes
    this.app.use('/api/user', userRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/news', newsRoutes);
    this.app.use('/api/article', articleRoutes);
    this.app.use('/api/quizzes', quizRoutes);
    this.app.use('/api/v1', chatRoute);

    // Handle user logout (POST)
    this.app.post('/api/logout', (req, res) => {
      res.clearCookie('token'); // Clears the 'token' cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
      });
    });

    // Serve React frontend for all other routes
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(this.dirname, 'frontend', 'build', 'index.html'));
    });
  }

  /**
   * Configure error handling middleware
   */
  setupErrorHandling() {
    this.app.use((err, req, res, next) => {
      console.error('Error:', err);

      // Determine status code
      const statusCode = err.statusCode || 500;

      // Send error response
      res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || 'An unexpected error occurred. Please try again later.',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    });
  }

  /**
   * Start the server
   */
  start() {
    this.app.listen(this.serverPort, () => {
      console.log(`
🚀 Server is running on port ${this.serverPort}
📝 API Documentation: http://localhost:${this.serverPort}/api-docs
🔧 Environment: ${process.env.NODE_ENV || 'development'}
      `);
    });
  }
}

/**
 * Main application execution
 */
async function startApplication() {
  try {
    // Initialize database connection
    await DatabaseConnection.initialize();

    // Create and start server
    const server = new Server();
    server.start();

    // Handle unexpected errors
    process.on('uncaughtException', (error) => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

// Start the application
startApplication();
