require('dotenv').config();
const mongoose = require('mongoose');
const Movie = require('./src/models/Movie');

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};

const seedMovies = async () => {
  await connectDB();

  await Movie.deleteMany({}); // Clear existing movies

  const movies = [
    {
      title: 'Inception',
      description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      category: 'Sci-Fi',
      thumbnail: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      videoUrl: 'https://example.com/inception.mp4',
      duration: '2h 28m',
      rating: 8.8,
      director: 'Christopher Nolan',
      cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
      releaseDate: new Date('2010-07-16'),
    },
    {
      title: 'The Dark Knight',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.',
      category: 'Action',
      thumbnail: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      videoUrl: 'https://example.com/dark-knight.mp4',
      duration: '2h 32m',
      rating: 9.0,
      director: 'Christopher Nolan',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
      releaseDate: new Date('2008-07-18'),
    },
    {
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
      category: 'Crime',
      thumbnail: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      videoUrl: 'https://example.com/pulp-fiction.mp4',
      duration: '2h 34m',
      rating: 8.9,
      director: 'Quentin Tarantino',
      cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
      releaseDate: new Date('1994-10-14'),
    },
    {
      title: 'Fight Club',
      description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
      category: 'Drama',
      thumbnail: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      videoUrl: 'https://example.com/fight-club.mp4',
      duration: '2h 19m',
      rating: 8.4,
      director: 'David Fincher',
      cast: ['Brad Pitt', 'Edward Norton', 'Helena Bonham Carter'],
      releaseDate: new Date('1999-10-15'),
    },
    {
      title: 'Seven',
      description: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.',
      category: 'Crime',
      thumbnail: 'https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg',
      videoUrl: 'https://example.com/seven.mp4',
      duration: '2h 7m',
      rating: 8.3,
      director: 'David Fincher',
      cast: ['Brad Pitt', 'Morgan Freeman', 'Gwyneth Paltrow'],
      releaseDate: new Date('1995-09-22'),
    },
    {
      title: 'Lady Bird',
      description: 'A California high school student plans to escape from her family and small town by going to college in New York.',
      category: 'Comedy',
      thumbnail: 'https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      videoUrl: 'https://example.com/lady-bird.mp4',
      duration: '1h 34m',
      rating: 7.3,
      director: 'Greta Gerwig',
      cast: ['Saoirse Ronan', 'Laurie Metcalf', 'Tracy Letts'],
      releaseDate: new Date('2017-11-03'),
    },
    {
      title: 'Pearl',
      description: 'In 1918, a young woman on the brink of madness pursues stardom in a desperate bid for recognition.',
      category: 'Horror',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Pearl_theatricalposter.jpg',
      videoUrl: 'https://example.com/pearl.mp4',
      duration: '1h 43m',
      rating: 7.0,
      director: 'Ti West',
      cast: ['Mia Goth', 'David Corenswet', 'Tandi Wright'],
      releaseDate: new Date('2022-09-16'),
    },
  ];

  await Movie.insertMany(movies);
  console.log('Movies seeded');
  process.exit();
};

seedMovies();