import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:5000/api/movies/${id}/stream`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setVideoUrl(res.data.videoUrl));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl">
          <video controls className="w-full rounded-xl shadow-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;