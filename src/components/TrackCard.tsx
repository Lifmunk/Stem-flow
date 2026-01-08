import React from 'react';
import { Track } from '@/types/music';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause } from 'lucide-react';
import { formatDuration } from '@/lib/jamendo';

interface TrackCardProps {
  track: Track;
  queue?: Track[];
  index?: number;
}

export function TrackCard({ track, queue, index = 0 }: TrackCardProps) {
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
    <div
      onClick={handleClick}
      className={`group relative flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        isCurrentTrack 
          ? 'bg-secondary/80 ring-1 ring-primary/30' 
          : 'hover:bg-secondary/50'
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Album Art */}
      <div className="relative flex-shrink-0">
        <img
          src={track.image || '/placeholder.svg'}
          alt={track.album_name}
          className={`w-14 h-14 rounded-lg object-cover transition-all ${
            isCurrentTrack && isPlaying ? 'animate-spin-slow' : ''
          }`}
        />
        <div className={`absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 transition-opacity ${
          isCurrentTrack ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white fill-white" />
          )}
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium truncate transition-colors ${
          isCurrentTrack ? 'text-primary' : 'text-foreground'
        }`}>
          {track.name}
        </h3>
        <p className="text-sm text-muted-foreground truncate">
          {track.artist_name}
        </p>
      </div>

      {/* Duration */}
      <span className="text-sm text-muted-foreground flex-shrink-0">
        {formatDuration(track.duration)}
      </span>

      {/* Playing indicator */}
      {isCurrentTrack && isPlaying && (
        <div className="flex items-center gap-0.5">
          <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-0.5 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
}
