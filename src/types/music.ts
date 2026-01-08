export interface Track {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  album_id: string;
  duration: number;
  audio: string;
  image: string;
  audiodownload: string;
}

export interface Album {
  id: string;
  name: string;
  artist_name: string;
  image: string;
  releasedate: string;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  joindate: string;
}

export interface Playlist {
  id: string;
  name: string;
  user_name: string;
  creationdate: string;
}

export interface JamendoTrackResponse {
  headers: {
    status: string;
    code: number;
    results_count: number;
  };
  results: Track[];
}

export interface JamendoAlbumResponse {
  headers: {
    status: string;
    code: number;
    results_count: number;
  };
  results: Album[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Track[];
  queueIndex: number;
}
