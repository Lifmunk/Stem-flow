import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';
import { Track, PlayerState } from '@/types/music';

interface PlayerContextType extends PlayerState {
  playTrack: (track: Track, queue?: Track[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  addToQueue: (track: Track) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    queue: [],
    queueIndex: 0,
  });

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = state.volume;

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleDurationChange = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  const playTrack = useCallback((track: Track, queue?: Track[]) => {
    if (!audioRef.current) return;

    const newQueue = queue || [track];
    const newIndex = queue ? queue.findIndex(t => t.id === track.id) : 0;

    audioRef.current.src = track.audio;
    audioRef.current.play();

    setState(prev => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      queue: newQueue,
      queueIndex: newIndex >= 0 ? newIndex : 0,
    }));
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current || !state.currentTrack) return;

    if (state.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, [state.isPlaying, state.currentTrack]);

  const nextTrack = useCallback(() => {
    if (state.queue.length === 0) return;

    const nextIndex = (state.queueIndex + 1) % state.queue.length;
    const nextTrackItem = state.queue[nextIndex];
    
    if (nextTrackItem && audioRef.current) {
      audioRef.current.src = nextTrackItem.audio;
      audioRef.current.play();
      setState(prev => ({
        ...prev,
        currentTrack: nextTrackItem,
        queueIndex: nextIndex,
        isPlaying: true,
      }));
    }
  }, [state.queue, state.queueIndex]);

  const prevTrack = useCallback(() => {
    if (state.queue.length === 0) return;

    // If more than 3 seconds in, restart current track
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const prevIndex = state.queueIndex === 0 ? state.queue.length - 1 : state.queueIndex - 1;
    const prevTrackItem = state.queue[prevIndex];
    
    if (prevTrackItem && audioRef.current) {
      audioRef.current.src = prevTrackItem.audio;
      audioRef.current.play();
      setState(prev => ({
        ...prev,
        currentTrack: prevTrackItem,
        queueIndex: prevIndex,
        isPlaying: true,
      }));
    }
  }, [state.queue, state.queueIndex]);

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    setState(prev => ({ ...prev, volume }));
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setState(prev => ({
      ...prev,
      queue: [...prev.queue, track],
    }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        seek,
        setVolume,
        addToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
