import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const UserEpisode = () => {
    const { animeId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videoLayout, setVideoLayout] = useState('vertical');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                if (!animeId) {
                    throw new Error('Anime ID is missing.');
                }
                
                setLoading(true);
                setError(null);
                
                const response = await fetch(`http://localhost:8000/api/animeepisode/animeepisode/${animeId}/with-episodes`);
                
                if (!response.ok) {
                    throw new Error(response.status === 404 
                        ? 'Anime not found.' 
                        : 'Failed to fetch anime details.');
                }
                
                const data = await response.json();
                
                if (!data.episodes || data.episodes.length === 0) {
                    throw new Error('No episodes available for this anime.');
                }
                
                setEpisodes(data.episodes);
                setSelectedEpisode(data.episodes[0]);
                
            } catch (err) {
                setError(err.message);
                console.error('Error fetching episodes:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [animeId]);

    const handleEpisodeSelect = (episode) => {
        setSelectedEpisode(episode);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleVideoLayout = () => {
        setVideoLayout(prev => prev === 'vertical' ? 'horizontal' : 'vertical');
    };

    // Function to properly format video URL
    const getVideoUrl = (path) => {
        // Remove any leading slashes or backslashes
        const cleanPath = path.replace(/^[\\/]+/, '');
        return `http://localhost:8000/storage/${cleanPath}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                    <p className="mt-4 text-lg text-white">Loading episodes...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
                <div className="max-w-md p-6 text-center">
                    <div className="p-4 mb-4 text-red-500 bg-gray-800 rounded-lg">
                        <h2 className="mb-2 text-xl font-bold">Error</h2>
                        <p>{error}</p>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen text-white bg-gradient-to-br from-gray-900 to-black">
            <Navbar handleLogout={handleLogout} />

            <div className="flex-grow p-4 mt-0 md:mt-0 md:p-6 md:ml-24">
                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Video Player Section */}
                    <div className={`${videoLayout === 'vertical' ? 'lg:col-span-2' : 'col-span-full'} mt-14 md:mt-0`}>
                        {selectedEpisode && (
                            <div className="overflow-hidden bg-gray-800 shadow-2xl rounded-xl">
                                {/* Video Controls Header */}
                                <div className="flex items-center justify-between p-3 bg-gray-900">
                                    <h3 className="text-sm font-semibold truncate md:text-base">
                                        Episode {selectedEpisode.episode_number}: {selectedEpisode.title}
                                    </h3>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={toggleVideoLayout}
                                            className="px-3 py-1 text-xs transition-colors bg-gray-700 rounded-lg md:text-sm hover:bg-gray-600"
                                        >
                                            {videoLayout === 'vertical' ? 'Full Width' : 'Normal View'}
                                        </button>
                                        <button
                                            onClick={() => navigate(`/UserProduct/${animeId}`)}
                                            className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded-lg md:text-sm hover:bg-blue-700"
                                        >
                                            Products
                                        </button>
                                    </div>
                                </div>

                                {/* Video Player - Fixed with proper aspect ratio */}
                                <div className={videoLayout === 'vertical' ? 'aspect-w-16 aspect-h-9' : 'aspect-w-21 aspect-h-9'}>
                                    <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 aspect ratio */}
                                        <video
                                            key={selectedEpisode.id} // Important for re-rendering when episode changes
                                            controls
                                            autoPlay
                                            className="absolute top-0 left-0 w-full h-full"
                                            poster={selectedEpisode.thumbnail_url ? getVideoUrl(selectedEpisode.thumbnail_url) : ''}
                                            src={getVideoUrl(selectedEpisode.video_url)}
                                        >
                                            Your browser does not support the video tag.
                                            <track kind="captions" srcLang="en" label="English" />
                                        </video>
                                    </div>
                                </div>

                                {/* Episode Details */}
                                <div className="p-4 md:p-6">
                                    <h1 className="mb-2 text-xl font-bold md:text-2xl">
                                        Episode {selectedEpisode.episode_number}: {selectedEpisode.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-2 py-1 text-xs bg-gray-700 rounded-md">
                                            Duration: {selectedEpisode.duration || 'N/A'}
                                        </span>
                                        <span className="px-2 py-1 text-xs bg-gray-700 rounded-md">
                                            Release: {selectedEpisode.release_date || 'N/A'}
                                        </span>
                                    </div>
                                    <p className="text-gray-300">
                                        {selectedEpisode.description || 'No description available.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Episodes List Sidebar */}
                    {videoLayout === 'vertical' && (
                        <div className="lg:col-span-1">
                            <div className="sticky top-4">
                                <div className="overflow-hidden bg-gray-800 shadow-2xl rounded-xl">
                                    <div className="p-4 bg-gray-900">
                                        <h2 className="text-lg font-bold">Episodes ({episodes.length})</h2>
                                    </div>
                                    <div className="overflow-y-auto max-h-[70vh]">
                                        {episodes.map((episode) => (
                                            <div
                                                key={episode.id}
                                                onClick={() => handleEpisodeSelect(episode)}
                                                className={`p-3 border-b border-gray-700 cursor-pointer transition-colors ${
                                                    selectedEpisode?.id === episode.id 
                                                        ? 'bg-blue-900/30' 
                                                        : 'hover:bg-gray-700/50'
                                                }`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className="flex-shrink-0 w-16 overflow-hidden rounded-md aspect-w-16 aspect-h-9">
                                                        {episode.thumbnail_url ? (
                                                            <img
                                                                src={getVideoUrl(episode.thumbnail_url)}
                                                                alt={`Thumbnail for Episode ${episode.episode_number}`}
                                                                className="object-cover w-full h-full"
                                                            />
                                                        ) : (
                                                            <div className="flex items-center justify-center w-full h-full bg-gray-700">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-semibold truncate">
                                                            Ep. {episode.episode_number}
                                                        </h3>
                                                        <p className="text-xs text-gray-400 truncate">
                                                            {episode.title || 'Untitled Episode'}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            {episode.duration || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* All Episodes Grid */}
                <section className="mt-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold md:text-2xl">
                            All Episodes
                        </h2>
                        <span className="px-3 py-1 text-sm bg-gray-800 rounded-full">
                            {episodes.length} Episodes
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {episodes.map((episode) => (
                            <div
                                key={episode.id}
                                onClick={() => handleEpisodeSelect(episode)}
                                className="transition-transform transform cursor-pointer group hover:scale-105"
                            >
                                <div className="relative mb-2 overflow-hidden rounded-lg aspect-w-16 aspect-h-9">
                                    {episode.thumbnail_url ? (
                                        <img
                                            src={getVideoUrl(episode.thumbnail_url)}
                                            alt={`Thumbnail for Episode ${episode.episode_number}`}
                                            className="object-cover w-full h-full transition-opacity group-hover:opacity-80"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full bg-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
                                        {episode.duration || 'N/A'}
                                    </div>
                                    {selectedEpisode?.id === episode.id && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                            <span className="p-2 text-white bg-blue-600 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-1">
                                    <h3 className="text-sm font-semibold truncate">
                                        Ep. {episode.episode_number}
                                    </h3>
                                    <p className="text-xs text-gray-400 truncate">
                                        {episode.title || 'Untitled Episode'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserEpisode;