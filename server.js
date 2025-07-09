import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Import routes
import signUp from './routes/signup_route.js';
import logIn from './routes/login_route.js';
import profile from './routes/profile.js';
import profileUpdateRoute from './routes/profileUpdate_route.js';
import logout from './routes/logout_route.js';
import favoritesRoute from './routes/favorites_route.js';
import movieRoute from './routes/importMovie_route.js';
import watchlistRoute from './routes/watchList_route.js';
import reviewRoute from './routes/review_route.js';
import followRoutes from './routes/followOrfUnfollow.js';
import userRoutes from './routes/user_route.js';
import deleteAccountRoutes from './routes/delete_account_route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    autoRemove: 'native',
    collectionName: 'sessions',
    ttl: 60 * 60,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
}));

// Routes
app.get('/', (req, res) => res.send('Welcome!!!'));
app.use(signUp);
app.use(logIn);
app.use(profile);
app.use(profileUpdateRoute);
app.use(logout);
app.use(favoritesRoute);
app.use(movieRoute);
app.use(watchlistRoute);
app.use(reviewRoute);
app.use('/users', followRoutes);
app.use('/users', userRoutes);
app.use('/users', deleteAccountRoutes);
app.use('/uploads', express.static('uploads'));

// Serve frontend build (ONLY in production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

// MongoDB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
