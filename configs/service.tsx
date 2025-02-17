// configs/service.ts
import axios from "axios";

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const getVideos = async (query: string) => {
  const params = {
    part: 'snippet',
    q: query,
    maxResults: 2,
    key: process.env.NEXT_PUBLIC_YOUTUBE_API,
    type: 'video',
  };

  try {
    const res = await axios.get(YOUTUBE_BASE_URL, { params });
    return res.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};