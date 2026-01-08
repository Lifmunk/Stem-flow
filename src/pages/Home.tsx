import React, { useEffect, useState } from 'react';
import { getTrendingTracks, getNewReleases, getFeaturedAlbums } from '@/lib/jamendo';
import { Track, Album } from '@/types/music';
import { useUser } from '@/context/UserContext';
import { TrackCard } from '@/components/TrackCard';
import { AlbumCard } from '@/components/AlbumCard';
import { FeaturedTrack } from '@/components/FeaturedTrack';
import { Section } from '@/components/Section';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Sparkles } from 'lucide-react';

export function Home() {
  const { userName } = useUser();
  const [trending, setTrending] = useState<Track[]>([]);
  const [newReleases, setNewReleases] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [trendingData, newData, albumsData] = await Promise.all([
          getTrendingTracks(20),
          getNewReleases(10),
          getFeaturedAlbums(8),
        ]);
        setTrending(trendingData);
        setNewReleases(newData);
        setAlbums(albumsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const featuredTrack = trending[0];

  return (
    <div className="animate-fade-in">
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">
          {getGreeting()}, <span className="gradient-text">{userName}</span>
        </h1>
        <p className="text-muted-foreground mt-2">Discover what's trending today</p>
      </div>

      {/* Featured Track */}
      {featuredTrack && (
        <div className="mb-10">
          <FeaturedTrack track={featuredTrack} queue={trending} />
        </div>
      )}

      {/* Trending Section */}
      <Section
        title="Trending Now"
        subtitle="The hottest tracks this week"
      >
        <div className="grid gap-2">
          {trending.slice(1, 11).map((track, index) => (
            <TrackCard key={track.id} track={track} queue={trending} index={index} />
          ))}
        </div>
      </Section>

      {/* Featured Albums */}
      <Section
        title="Featured Albums"
        subtitle="Curated collections for you"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {albums.map((album, index) => (
            <AlbumCard key={album.id} album={album} index={index} />
          ))}
        </div>
      </Section>

      {/* New Releases */}
      <Section
        title="New Releases"
        subtitle="Fresh music just dropped"
      >
        <div className="glass rounded-xl p-4 gradient-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Latest Drops</span>
          </div>
          <div className="grid gap-2">
            {newReleases.map((track, index) => (
              <TrackCard key={track.id} track={track} queue={newReleases} index={index} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

export default Home;
