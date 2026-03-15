import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/movies" className="inline-flex items-center text-red-400 hover:text-red-300 mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <img src={movie.thumbnail} alt={movie.title} className="w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">{movie.category}</span>
                <span className="text-yellow-400 text-lg">★ {movie.rating}/10</span>
                <span className="text-gray-400">{movie.duration}</span>
                <span className="text-gray-400">{new Date(movie.releaseDate).getFullYear()}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3">Synopsis</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{movie.description}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3">Director</h3>
              <p className="text-gray-300 text-lg">{movie.director}</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3">Cast</h3>
              <div className="flex flex-wrap gap-3">
                {movie.cast.map((actor, index) => (
                  <span key={index} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition-colors cursor-pointer">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-6">
              <Link to={`/watch/${id}`} className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;