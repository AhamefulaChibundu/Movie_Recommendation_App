import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import signUp from './routes/signup_route.js';
import logIn from './routes/login_route.js';
import profile from './routes/profile.js';
import profileUpdateRoute from './routes/profileUpdate_route.js';
import logout from './routes/logout_route.js';
import deleteAccount from './routes/delete_account_route.js';
import favoritesRoute from './routes/favorites_route.js';
import movieRoute from './routes/importMovie_route.js';
import watchlistRoute from './routes/watchList_route.js';
import reviewRoute from './routes/review_route.js';
import followRoutes from './routes/followOrfUnfollow.js';
import userRoutes from './routes/user_route.js';
import deleteAccountRoutes from './routes/delete_account_route.js';

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    collectionName: 'sessions',
    ttl: 60 * 60,
    autoRemove: 'native',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// Backend API routes
app.use(signUp);
app.use(logIn);
app.use(profile);
app.use(profileUpdateRoute);
app.use(logout);
app.use(deleteAccount);
app.use(favoritesRoute);
app.use(movieRoute);
app.use(watchlistRoute);
app.use(reviewRoute);
app.use(followRoutes);
app.use(userRoutes);
app.use(deleteAccountRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve React frontend 
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
