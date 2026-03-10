import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black bg-opacity-90 backdrop-blur-md text-white p-6 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-red-500 text-4xl font-bold hover:text-red-400 transition-colors font-canterbury">
          Divine Films
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/login" className="hover:text-gray-300 transition-colors">Login</Link>
          <Link to="/register" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;