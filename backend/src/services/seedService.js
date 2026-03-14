const Movie = require('../models/Movie');
const SeedMeta = require('../models/SeedMeta');
const movies = require('../data/movies');

const MOVIES_SEED_NAME = 'movies_v1';

const seedMoviesIfNeeded = async () => {
  const existingMoviesCount = await Movie.countDocuments();
  const existingSeed = await SeedMeta.findOne({ name: MOVIES_SEED_NAME });

  if (existingMoviesCount > 0) {
    if (existingSeed) {
      return { seeded: false, reason: 'seed marker exists and movies are present' };
    }

    await SeedMeta.updateOne(
      { name: MOVIES_SEED_NAME },
      { $set: { completedAt: new Date() } },
      { upsert: true }
    );
    return { seeded: false, reason: 'movies already present (seed marker restored)' };
  }

  const reseedReason = existingSeed
    ? 'seed marker existed but movies were missing'
    : 'no movies and no seed marker found';

  for (const movie of movies) {
    await Movie.updateOne({ title: movie.title }, { $set: movie }, { upsert: true });
  }

  await SeedMeta.updateOne(
    { name: MOVIES_SEED_NAME },
    { $set: { completedAt: new Date() } },
    { upsert: true }
  );

  return { seeded: true, inserted: movies.length, reason: reseedReason };
};

module.exports = {
  seedMoviesIfNeeded,
  MOVIES_SEED_NAME,
};
