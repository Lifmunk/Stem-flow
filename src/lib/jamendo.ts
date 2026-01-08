import { Track, Album, JamendoTrackResponse, JamendoAlbumResponse } from '@/types/music';

// Jamendo API client ID (public/free tier)
const CLIENT_ID = '2c9a11b9';
const BASE_URL = 'https://api.jamendo.com/v3.0';

export async function getTrendingTracks(limit = 20): Promise<Track[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&order=popularity_week&include=musicinfo&imagesize=600`
    );
    const data: JamendoTrackResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return [];
  }
}

export async function getNewReleases(limit = 10): Promise<Track[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&order=releasedate_desc&include=musicinfo&imagesize=600`
    );
    const data: JamendoTrackResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
}

export async function getFeaturedAlbums(limit = 10): Promise<Album[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=${limit}&order=popularity_week&imagesize=600`
    );
    const data: JamendoAlbumResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching featured albums:', error);
    return [];
  }
}

export async function searchTracks(query: string, limit = 20): Promise<Track[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&search=${encodeURIComponent(query)}&include=musicinfo&imagesize=600`
    );
    const data: JamendoTrackResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    return [];
  }
}

export async function searchAlbums(query: string, limit = 10): Promise<Album[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/albums/?client_id=${CLIENT_ID}&format=json&limit=${limit}&namesearch=${encodeURIComponent(query)}&imagesize=600`
    );
    const data: JamendoAlbumResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching albums:', error);
    return [];
  }
}

export async function getAlbumTracks(albumId: string): Promise<Track[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&album_id=${albumId}&include=musicinfo&imagesize=600`
    );
    const data: JamendoTrackResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching album tracks:', error);
    return [];
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
