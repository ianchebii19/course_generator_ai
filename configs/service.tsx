import { default: axios }  from "axios";
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const getVideos = async (query) => {
    const params = {
        part: 'snippet',
        q: query,
        maxResults: 2, // Corrected from maxResult to maxResults
        key: process.env.NEXT_PUBLIC_YOUTUBE_API // Ensure this environment variable is set
    };

    try {
        const res = await axios.get(YOUTUBE_BASE_URL, { params });
        return res.data.items; // Return the video items
    } catch (error) {
        console.error('Error fetching videos:', error);
        return []; // Return an empty array on error
    }
};

module.exports = {
    getVideos // Directly exporting the function
};
