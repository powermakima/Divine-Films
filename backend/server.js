require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const { seedMoviesIfNeeded } = require('./src/services/seedService');

const port = process.env.PORT || 5000;

const bootstrap = async () => {
  await connectDB();

  if (process.env.AUTO_SEED_ON_EMPTY_DB !== 'false') {
    const seedResult = await seedMoviesIfNeeded();
    if (seedResult.seeded) {
      console.log(
        `Movie seed completed (${seedResult.inserted} records). Reason: ${seedResult.reason}.`
      );
    } else {
      console.log(`Movie seed skipped. Reason: ${seedResult.reason}.`);
    }
  } else {
    console.log('Movie auto-seed disabled via AUTO_SEED_ON_EMPTY_DB=false.');
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
