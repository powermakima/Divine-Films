import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      alert('Logged in');
      navigate('/');
    } catch (err) {
      alert('Error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-4 bg-gray-900 border border-gray-600 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition-all text-white placeholder-gray-500"
            />
          </div>
          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-400">Don't have an account? <Link to="/register" className="text-red-400 hover:text-red-300 font-medium">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;