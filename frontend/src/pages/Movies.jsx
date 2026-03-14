import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Antigravity from '../components/Antigravity';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/movies`);
        setMovies(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Could not load movies. Make sure the backend is running on port 5000.');
        console.error('Failed to load movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <Antigravity
          count={300}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#962020"
          autoAnimate
          particleVariance={1}
          rotationSpeed={0}
          depthFactor={1}
          pulseSpeed={3}
          particleShape="capsule"
          fieldStrength={10}
        />
      </div>
      <div 
        className="min-h-screen p-8 relative z-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(10,10,10,0.8), rgba(0,0,0,0.9))'
        }}
      >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-white">Just watch a goddamn movie</h1>
        {loading && (
          <p className="text-center text-gray-300 text-lg mb-8">Loading movies...</p>
        )}
        {error && (
          <p className="text-center text-red-400 text-lg mb-8">{error}</p>
        )}
        {!loading && !error && movies.length === 0 && (
          <p className="text-center text-gray-300 text-lg mb-8">No movies found in the database.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map(movie => (
            <Link key={movie._id} to={`/movie/${movie._id}`} className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-3xl">
                <div className="relative overflow-hidden">
                  <img src={movie.thumbnail} alt={movie.title} className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2 truncate">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mb-2">{movie.category}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-sm">★ {movie.rating}</span>
                    <span className="text-gray-500 text-sm ml-2">• {new Date(movie.releaseDate).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Movies;
