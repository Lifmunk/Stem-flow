import React from 'react';
import { Track } from '@/types/music';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause } from 'lucide-react';

interface FeaturedTrackProps {
  track: Track;
  queue?: Track[];
}

export function FeaturedTrack({ track, queue }: FeaturedTrackProps) {
  const { playTrack, currentTrack, isPlaying, togglePlay } = usePlayer();
  const isCurrentTrack = currentTrack?.id === track.id;

  const handleClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track, queue);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl group cursor-pointer" onClick={handleClick}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={track.image || '/placeholder.svg'}
          alt={track.album_name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 sm:p-12 min-h-[300px] flex flex-col justify-end">
        <p className="text-primary text-sm font-medium mb-2 uppercase tracking-wider">
          Featured Track
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 line-clamp-2">
          {track.name}
        </h2>
        <p className="text-lg text-white/80 mb-6">
          {track.artist_name}
        </p>
        
        <button
          className="inline-flex items-center gap-3 w-fit px-6 py-3 rounded-full gradient-bg text-primary-foreground font-semibold hover:opacity-90 transition-all glow"
        >
          {isCurrentTrack && isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              <span>Play Now</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
