require('dotenv').config();
const mongoose = require('mongoose');
const { seedMoviesIfNeeded } = require('./src/services/seedService');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const seedMovies = async () => {
  await connectDB();

  const result = await seedMoviesIfNeeded();
  if (result.seeded) {
    console.log(`Movies seeded (${result.inserted} records)`);
  } else {
    console.log(`Seed skipped (${result.reason})`);
  }

  await mongoose.disconnect();
  process.exit();
};

seedMovies();
