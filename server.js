import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
import cors from 'cors';

const PORT = 2000;

const app = express();
dotenv.config();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:2000',
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        autoRemove: 'native',
        collectionName: 'sessions',
        ttl: 60 *60
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 //1hr
    }
}))

app.get('/', (req, res) => {
    res.send("welcome!!!")
})
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

// Setting up connection to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected Successfully');
}).catch((error) => {
    console.error('MongoDB connection Failed!!!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`)
})