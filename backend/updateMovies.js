require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const updateMovies = async () => {
  await connectDB();

  const updates = [
    {
      title: 'Inception',
      thumbnail: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    },
    {
      title: 'The Dark Knight',
      thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    },
    {
      title: 'Pulp Fiction',
      thumbnail: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    },
  ];

  for (const update of updates) {
    await Movie.findOneAndUpdate({ title: update.title }, { thumbnail: update.thumbnail });
  }

  console.log('Movies updated with thumbnails');
  process.exit();
};

updateMovies();