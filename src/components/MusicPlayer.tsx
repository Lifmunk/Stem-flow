import React, { useState } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatDuration } from '@/lib/jamendo';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Maximize2,
  ChevronDown,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
  } = usePlayer();

  const [isExpanded, setIsExpanded] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.7);

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration;
    seek(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
    } else {
      setVolume(prevVolume);
    }
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  // Expanded full-screen player
  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        {/* Background with album art blur */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={currentTrack.image || '/placeholder.svg'}
            alt=""
            className="w-full h-full object-cover blur-3xl opacity-30 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 max-w-lg mx-auto">
          {/* Close button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-6 left-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </button>

          {/* Album Art */}
          <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl mb-10 glow">
            <img
              src={currentTrack.image || '/placeholder.svg'}
              alt={currentTrack.album_name}
              className={`w-full h-full object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
            />
          </div>

          {/* Track Info */}
          <div className="text-center mb-8 w-full">
            <h2 className="text-2xl font-bold truncate mb-1">{currentTrack.name}</h2>
            <p className="text-muted-foreground">{currentTrack.artist_name}</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full mb-8">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>{formatDuration(currentTime)}</span>
              <span>{formatDuration(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button onClick={prevTrack} className="p-3 hover:text-primary transition-colors">
              <SkipBack className="w-8 h-8" />
            </button>
            <button
              onClick={togglePlay}
              className="w-18 h-18 rounded-full gradient-bg flex items-center justify-center glow hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-primary-foreground" />
              ) : (
                <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground ml-1" />
              )}
            </button>
            <button onClick={nextTrack} className="p-3 hover:text-primary transition-colors">
              <SkipForward className="w-8 h-8" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 mt-10 w-48">
            <button onClick={toggleMute} className="hover:text-primary transition-colors">
              <VolumeIcon className="w-5 h-5" />
            </button>
            <Slider
              value={[volume * 100]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // Mini player bar
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border/50">
      {/* Progress bar (thin line at top) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-secondary">
        <div
          className="h-full gradient-bg transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Track Info */}
          <div
            className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src={currentTrack.image || '/placeholder.svg'}
              alt={currentTrack.album_name}
              className={`w-12 h-12 rounded-lg object-cover ${isPlaying ? 'animate-spin-slow' : ''}`}
            />
            <div className="min-w-0">
              <h4 className="font-medium truncate text-sm">{currentTrack.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist_name}</p>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={prevTrack}
              className="p-2 hover:text-primary transition-colors hidden sm:block"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Play className="w-5 h-5 text-primary-foreground fill-primary-foreground ml-0.5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="p-2 hover:text-primary transition-colors hidden sm:block"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Progress & Volume (Desktop) */}
          <div className="hidden md:flex items-center gap-4 flex-1 justify-end">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatDuration(currentTime)}
            </span>
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="w-32 cursor-pointer"
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatDuration(duration)}
            </span>
            
            <div className="flex items-center gap-2 ml-4">
              <button onClick={toggleMute} className="hover:text-primary transition-colors">
                <VolumeIcon className="w-4 h-4" />
              </button>
              <Slider
                value={[volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20 cursor-pointer"
              />
            </div>
          </div>

          {/* Expand button */}
          <button
            onClick={() => setIsExpanded(true)}
            className="p-2 hover:text-primary transition-colors ml-2"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
