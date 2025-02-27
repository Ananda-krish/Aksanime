import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAnimeEpisode = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        anime_card_id: "",
        title: "",
        description: "",        
        episode_number: "",
    });
    const [videoFile, setVideoFile] = useState(null);
    const [animeCards, setAnimeCards] = useState([]);
    const [currentVideo, setCurrentVideo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [episodeResponse, animeCardsResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/animeepisode/episodeshow/${id}`),
                    fetch('http://127.0.0.1:8000/api/animecard/animelist')
                ]);

                if (!episodeResponse.ok || !animeCardsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const episodeData = await episodeResponse.json();
                const animeCardsData = await animeCardsResponse.json();

                setAnimeCards(animeCardsData.data);
                
                // Set form data based on Episode data from response
                const episode = episodeData.Episode;
                setFormData({
                    anime_card_id: episode.anime_card_id,
                    title: episode.title,
                    description: episode.description || '',
                    episode_number: episode.episode_number
                });
                setCurrentVideo(episode.video_url);
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load episode data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setVideoFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('anime_card_id', formData.anime_card_id);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('episode_number', formData.episode_number);
            
            if (videoFile) {
                formDataToSend.append('video_url', videoFile);
            }
            formDataToSend.append('_method', 'PUT');

            const response = await fetch(
                `http://127.0.0.1:8000/api/animeepisode/episodeupdate/${id}`,
                {
                    method: 'POST',
                    body: formDataToSend,
                }
            );

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || 'Update failed');
                }
                alert(result.message || 'Episode updated successfully');
                navigate('/admin-dashboard/animeepisode/list');
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setError(err.message || 'Failed to update episode');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className="max-w-2xl p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold">Edit Anime Episode</h2>
            
            {error && (
                <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <label htmlFor="anime_card_id" className="block mb-1">
                        Anime Card:
                    </label>
                    <select
                        id="anime_card_id"
                        name="anime_card_id"
                        value={formData.anime_card_id}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select Anime Card</option>
                        {animeCards.map(card => (
                            <option key={card.id} value={card.id}>
                                {card.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="title" className="block mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                        maxLength={100}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description" className="block mb-1">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="episode_number" className="block mb-1">
                        Episode Number:
                    </label>
                    <input
                        type="number"
                        id="episode_number"
                        name="episode_number"
                        value={formData.episode_number}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                        min="1"
                    />
                </div>

                {currentVideo && (
                    <div className="form-group">
                        <label className="block mb-1">Current Video:</label>
                        <video controls className="w-full max-w-md">
                            <source 
                                src={`http://127.0.0.1:8000/storage/${currentVideo}`}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="video_url" className="block mb-1">
                        Upload New Video:
                    </label>
                    <input
                        type="file"
                        id="video_url"
                        name="video_url"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        accept="video/*"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Episode'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin-dashboard/animeepisode/list')}
                        className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAnimeEpisode;