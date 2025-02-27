import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [visibleCards, setVisibleCards] = useState(6);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/animecard/animelist');
        const data = await response.json();
        setAnimeList(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching anime:', error);
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/animecard/search?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setSearchResults(data.data);
      setVisibleCards(data.data.length);
    } catch (error) {
      console.error('Error searching anime:', error);
    }
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = -(x - centerX) / 20;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
    setHoveredIndex(null);
  };

  const loadMore = () => {
    setVisibleCards(prev => prev + 6);
  };

  const AnimeCard = ({ anime, index }) => (
    <div className="group relative w-full h-[450px]">
      <div
        ref={el => cardRefs.current[index] = el}
        className="relative w-full h-full overflow-hidden transition-all duration-300 bg-gray-800 rounded-xl"
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={() => handleMouseLeave(index)}
        onMouseEnter={() => setHoveredIndex(index)}
      >
        {/* Animated border */}
        <div className="absolute inset-0 z-10">
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <div className="absolute top-0 left-0 w-[200%] h-[200%] animate-spin-slow origin-center bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
                 style={{
                   background: 'linear-gradient(90deg, transparent, #60A5FA, transparent)',
                   transform: 'translateX(-50%) translateY(-50%)',
                 }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="absolute inset-[2px] bg-gray-900 rounded-xl z-20 overflow-hidden">
          {/* Image */}
          <div className="w-full h-full">
            <img
              src={`http://127.0.0.1:8000${anime.image_url}`}
              alt={anime.title}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Title overlay always visible */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
            <h3 className="text-xl font-bold text-white">{anime.title}</h3>
          </div>

          {/* Details overlay on hover */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6 bg-black/80 "
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="mb-4 font-bold text-white text-2x1">{anime.title}</h3>
            <div className="space-y-2 text-center text-gray-200"> 
              <p>Episodes: {anime.latest_episode}</p>
              <p>Seasons: {anime.seasons}</p>
              <p>Status: {anime.status}</p>
              <div className="flex items-center justify-center">
                <span className="text-xl text-yellow-400">★</span>
                <span className="ml-2">{anime.rating}/10</span>
              </div>
              <p className="mt-2 text-sm text-gray-300">{anime.description}</p>
              <button
                className="px-4 py-2 mt-4 mb-4 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                onClick={() => navigate(`/UserEpisode/${anime.id}`)}
              >
                Episodes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="relative px-6 py-16 text-white relatmin-h-screen sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search anime by title or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="absolute top-0 bottom-0 right-0 px-4 py-2 text-white bg-blue-600 rounded-r-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-bold text-gray-900">ANIME COLLECTION</h1>
            <span className="text-gray-600">Featured Series</span>
          </div>
          <div className="w-full h-px bg-gray-400" />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(searchResults.length > 0 ? searchResults : animeList)
            .slice(0, visibleCards)
            .map((anime, index) => (
              <AnimeCard key={anime.id} anime={anime} index={index} />
            ))}
        </div>

        {searchResults.length === 0 && visibleCards < animeList.length && (
          <div className="mt-12 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-4 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnime;