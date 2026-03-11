require('dotenv').config();
const mongoose = require('mongoose');
const { seedMoviesIfNeeded } = require('./src/services/seedService');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const reseedDatabase = async () => {
  try {
    await connectDB();

    // Drop the database
    await mongoose.connection.dropDatabase();
    console.log('Database dropped successfully');

    // Re-seed the movies
    const result = await seedMoviesIfNeeded();
    if (result.seeded) {
      console.log(`✓ Movies re-seeded (${result.inserted} records)`);
    } else {
      console.log(`✗ Seed failed: ${result.reason}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error during re-seeding:', error);
    process.exit(1);
  }
};

reseedDatabase();
