import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserEpisode = () => {
    const { animeId } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                if (!animeId) {
                    throw new Error('Anime ID is missing.');
                }
                const response = await fetch(`http://localhost:8000/api/animeepisode/animeepisode/${animeId}/with-episodes`);
                if (!response.ok) {
                    throw new Error('Failed to fetch anime details.');
                }
                const data = await response.json();
                setEpisodes(data.episodes || []);
                // Set the first episode as selected by default
                if (data.episodes && data.episodes.length > 0) {
                    setSelectedEpisode(data.episodes[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodes();
    }, [animeId]);

    const handleEpisodeSelect = (episode) => {
        setSelectedEpisode(episode);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading episodes...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
        <div className="container p-4 mx-auto max-w-7xl">
            {/* Main Content Area */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {/* Main Video Section */}
                <div className="lg:col-span-2">
                    {selectedEpisode && (
                        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
                            {/* Main Video Player */}
                            <div className="aspect-w-16 aspect-h-9">
                                <video 
                                    controls 
                                    className="object-cover w-full h-full"
                                    src={`http://127.0.0.1:8000/storage/${selectedEpisode.video_url}`}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            {/* Video Title and Description */}
                            <div className="p-4">
                                <h1 className="mb-2 text-2xl font-bold">
                                    Episode {selectedEpisode.episode_number}: {selectedEpisode.title}
                                </h1>
                                <p className="text-gray-700">{selectedEpisode.description}</p>
                                <button  onClick={() => navigate(`/UserProduct/${animeId}`)}>product</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar Episodes List */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-lg">
                        <h2 className="p-4 text-xl font-bold border-b">Episodes</h2>
                        <div className="overflow-y-auto max-h-[600px]">
                            {episodes.map((episode) => (
                                <div
                                    key={episode.id}
                                    onClick={() => handleEpisodeSelect(episode)}
                                    className={`p-4 border-b cursor-pointer hover:bg-gray-100 transition-colors ${
                                        selectedEpisode?.id === episode.id ? 'bg-gray-100' : ''
                                    }`}
                                >
                                    <div className="flex gap-4">
                                        {/* Thumbnail placeholder */}
                                        <div className="flex-shrink-0 w-40 h-24 bg-gray-200 rounded">
                                            <video 
                                                className="object-cover w-full h-full"
                                                src={`http://127.0.0.1:8000/storage/${episode.video_url}`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="mb-1 font-semibold">
                                                Episode {episode.episode_number}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {episode.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Episode Grid at Bottom */}
            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">All Episodes</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {episodes.map((episode) => (
                        <div
                            key={episode.id}
                            onClick={() => handleEpisodeSelect(episode)}
                            className="transition-opacity cursor-pointer hover:opacity-75"
                        >
                            <div className="mb-2 aspect-w-16 aspect-h-9">
                                <video 
                                    className="object-cover w-full h-full rounded"
                                    src={`http://127.0.0.1:8000/storage/${episode.video_url}`}
                                />
                            </div>
                            <p className="text-sm font-semibold">Episode {episode.episode_number}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserEpisode;