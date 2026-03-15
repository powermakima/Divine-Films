import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="group relative overflow-hidden bg-black text-white p-6 sticky top-0 z-50 transition-colors duration-300">
      <div className="pointer-events-none absolute inset-0 bg-white -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

      <div className="relative z-10 max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-red-500 text-4xl font-bold hover:text-red-400 transition-colors font-canterbury">
          Divine Films
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="transition-colors hover:text-gray-300 group-hover:text-gray-900 group-hover:hover:text-gray-600">Home</Link>
          <Link to="/movies" className="transition-colors hover:text-gray-300 group-hover:text-gray-900 group-hover:hover:text-gray-600">Movies</Link>
          <Link to="/login" className="transition-colors hover:text-gray-300 group-hover:text-gray-900 group-hover:hover:text-gray-600">Login</Link>
          <Link to="/register" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;