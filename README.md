# DivineFilms - Movie Streaming Platform

A modern movie streaming platform built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, logout)
- Movie catalog with categories
- Video streaming player
- Admin panel for managing movies
- Favorites and watch history

## Tech Stack

- **Frontend:** React with Vite, Tailwind CSS
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure

```
divinefilms/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── config/
│   ├── package.json
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── package.json
│   └── ...
└── README.md
```

## API Endpoints

- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/:id/stream` - Stream movie (authenticated)

## Setup

1. Install dependencies for backend and frontend:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. Start MongoDB locally.

3. Configure environment variables in `backend/.env`.

4. Run backend:
   ```
   cd backend && npm run dev
   ```

5. Run frontend:
   ```
   cd frontend && npm run dev
   ```

## Sample Streaming Endpoint

```javascript
// backend/src/controllers/movieController.js
exports.streamMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send();
  }
  res.send({ videoUrl: movie.videoUrl });
};
```

## React Video Player Component

```jsx
// frontend/src/pages/VideoPlayer.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/movies/${id}/stream`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setVideoUrl(res.data.videoUrl));
  }, [id]);

  return (
    <div className="p-4">
      <video controls className="w-full">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
```