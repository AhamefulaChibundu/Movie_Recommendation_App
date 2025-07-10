import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

// Route imports
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    maxAge: 1000 * 60 * 60,
  },
}));

app.get('/', (req, res) => res.send('Welcome!!!'));

// Route mounting with logs to debug
console.log("1 - Mounting signup route");
app.use(signUp);

console.log("2 - Mounting login route");
app.use(logIn);

console.log("3 - Mounting profile route");
app.use(profile);

console.log("4 - Mounting profile update route");
app.use(profileUpdateRoute);

console.log("5 - Mounting logout route");
app.use(logout);

console.log("6 - Mounting favorites route");
app.use(favoritesRoute);

console.log("7 - Mounting movie import route");
app.use(movieRoute);

console.log("8 - Mounting watchlist route");
app.use(watchlistRoute);

console.log("9 - Mounting review route");
app.use(reviewRoute);

console.log("10 - Mounting follow routes");
app.use('/users', followRoutes);

console.log("11 - Mounting user routes");
app.use('/users', userRoutes);

console.log("12 - Mounting delete account routes");
app.use('/users', deleteAccountRoutes);

app.use('/uploads', express.static('uploads'));

// Production build serving
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.resolve(__dirname, 'client', 'build');
  app.use(express.static(buildPath));

  app.get('*', (req, res) => {
    const indexFile = path.resolve(buildPath, 'index.html');
    if (!fs.existsSync(indexFile)) {
      console.error("index.html NOT FOUND at", indexFile);
      return res.status(500).send("index.html missing");
    }
    res.sendFile(indexFile);
  });
}

// DB connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(' MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection failed:', err);
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
