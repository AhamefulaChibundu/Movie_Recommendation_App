# MOVIE RECOMMENDATION APP

A full-stack MERN application that allows users to sign up, log in, view and review movies, manage watchlists and favorites, follow other users, and receive personalized movie recommendations.

---

## Live Demo

- **Frontend** (Vercel): [https://movie-recommendation-app-silk.vercel.app](https://movie-recommendation-app-silk.vercel.app)
- **Backend** (Render): [https://movie-recommendation-vfd8.onrender.com](https://movie-recommendation-vfd8.onrender.com)

---

## Tech Stack

- **Frontend**: React, React Router DOM, Axios
- **Backend**: Express.js, Node.js, MongoDB, Mongoose
- **Authentication**: Session-based (express-session + connect-mongo)
- **Image Uploads**: Cloudinary via Multer
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com)
  - Backend: [Render](https://render.com)
- **External API**: The Movie Database (TMDB)

---

## Features

-  User authentication (signup, login, logout)
-  Session-based login with cookies
-  Profile management and image upload
-  Watchlist and favorites management
-  Movie reviews
-  Follow/unfollow users
-  Personalized movie recommendations
-  Responsive UI

---

## Environment Variables

Create a `.env` file in the root of your backend with the following:

```env
PORT=2000
DB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
JWT_TOKEN=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

Create a `.env` file in the root of your frontend with the following:
```
DB_URI=your_DB_uri
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

### Clone the project
``` bash
git clone https://github.com/your-username/movie-recommendation-app.git
cd movie-recommendation-app
```
Backend
``` bash
npm install
npm run dev
```

Frontend
``` bash
cd client
npm install
npm start
```

Author
Name: Chibundu Ahamefula

Email: ahamefulachibundu@gmail.com
