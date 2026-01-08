import React, { useState, useEffect, useCallback } from 'react';
import { searchTracks, searchAlbums } from '@/lib/jamendo';
import { Track, Album } from '@/types/music';
import { SearchBar } from '@/components/SearchBar';
import { TrackCard } from '@/components/TrackCard';
import { AlbumCard } from '@/components/AlbumCard';
import { Section } from '@/components/Section';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Search as SearchIcon, Music, Disc3, TrendingUp } from 'lucide-react';

export function Search() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) {
      setTracks([]);
      setAlbums([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const [tracksData, albumsData] = await Promise.all([
        searchTracks(query, 20),
        searchAlbums(query, 8),
      ]);
      setTracks(tracksData);
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [handleSearch]);

  const popularGenres = [
    { name: 'Electronic', color: 'from-cyan-500 to-blue-500' },
    { name: 'Rock', color: 'from-red-500 to-orange-500' },
    { name: 'Jazz', color: 'from-yellow-500 to-amber-500' },
    { name: 'Classical', color: 'from-purple-500 to-pink-500' },
    { name: 'Hip Hop', color: 'from-green-500 to-emerald-500' },
    { name: 'Pop', color: 'from-pink-500 to-rose-500' },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <SearchBar
        value={query}
        onChange={setQuery}
        autoFocus
      />

      {loading ? (
        <LoadingSpinner />
      ) : searched ? (
        <>
          {tracks.length === 0 && albums.length === 0 ? (
            <div className="text-center py-20">
              <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">Try searching for something else</p>
            </div>
          ) : (
            <>
              {/* Albums */}
              {albums.length > 0 && (
                <Section title="Albums" className="mt-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {albums.map((album, index) => (
                      <AlbumCard key={album.id} album={album} index={index} />
                    ))}
                  </div>
                </Section>
              )}

              {/* Tracks */}
              {tracks.length > 0 && (
                <Section title="Songs" className="mt-8">
                  <div className="grid gap-2">
                    {tracks.map((track, index) => (
                      <TrackCard key={track.id} track={track} queue={tracks} index={index} />
                    ))}
                  </div>
                </Section>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {/* Browse Categories */}
          <Section title="Browse all" className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {popularGenres.map((genre, index) => (
                <button
                  key={genre.name}
                  onClick={() => setQuery(genre.name)}
                  className="relative overflow-hidden rounded-xl p-6 text-left transition-transform hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${genre.color} opacity-80`} />
                  <span className="relative z-10 text-lg font-bold text-white">
                    {genre.name}
                  </span>
                </button>
              ))}
            </div>
          </Section>

          {/* Quick Actions */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setQuery('top hits')}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Top Hits</h3>
                <p className="text-sm text-muted-foreground">Most popular tracks</p>
              </div>
            </button>
            <button
              onClick={() => setQuery('new music')}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <Music className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">New Music</h3>
                <p className="text-sm text-muted-foreground">Latest releases</p>
              </div>
            </button>
            <button
              onClick={() => setQuery('albums')}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <Disc3 className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Albums</h3>
                <p className="text-sm text-muted-foreground">Full collections</p>
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
