import React, { useState } from 'react';
import { Album, Track } from '@/types/music';
import { usePlayer } from '@/context/PlayerContext';
import { getAlbumTracks } from '@/lib/jamendo';
import { Play, Disc3 } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  index?: number;
}

export function AlbumCard({ album, index = 0 }: AlbumCardProps) {
  const { playTrack } = usePlayer();
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    setLoading(true);
    try {
      const tracks = await getAlbumTracks(album.id);
      if (tracks.length > 0) {
        playTrack(tracks[0], tracks);
      }
    } catch (error) {
      console.error('Error playing album:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative overflow-hidden rounded-xl aspect-square mb-3">
        {album.image ? (
          <img
            src={album.image}
            alt={album.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <Disc3 className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Play button */}
        <button
          onClick={handlePlay}
          disabled={loading}
          className="absolute bottom-3 right-3 w-12 h-12 rounded-full gradient-bg flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 glow"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
          )}
        </button>
      </div>
      
      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
        {album.name}
      </h3>
      <p className="text-sm text-muted-foreground truncate">
        {album.artist_name}
      </p>
    </div>
  );
}
