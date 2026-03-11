const Movie = require('../models/Movie');
const SeedMeta = require('../models/SeedMeta');
const movies = require('../data/movies');

const MOVIES_SEED_NAME = 'movies_v1';

const seedMoviesIfNeeded = async () => {
  const existingSeed = await SeedMeta.findOne({ name: MOVIES_SEED_NAME });
  if (existingSeed) {
    return { seeded: false, reason: 'seed marker exists' };
  }

  const existingMoviesCount = await Movie.countDocuments();
  if (existingMoviesCount > 0) {
    await SeedMeta.updateOne(
      { name: MOVIES_SEED_NAME },
      { $set: { completedAt: new Date() } },
      { upsert: true }
    );
    return { seeded: false, reason: 'movies already present' };
  }

  for (const movie of movies) {
    await Movie.updateOne({ title: movie.title }, { $set: movie }, { upsert: true });
  }

  await SeedMeta.updateOne(
    { name: MOVIES_SEED_NAME },
    { $set: { completedAt: new Date() } },
    { upsert: true }
  );

  return { seeded: true, inserted: movies.length };
};

module.exports = {
  seedMoviesIfNeeded,
  MOVIES_SEED_NAME,
};
