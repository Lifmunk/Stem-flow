import React from 'react';
import { useUser } from '@/context/UserContext';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { Header } from '@/components/Header';
import { MusicPlayer } from '@/components/MusicPlayer';
import { Search } from '@/pages/Search';

const SearchPage = () => {
  const { userName } = useUser();

  if (!userName) {
    return <WelcomeScreen />;
  }

  return (
    <div className="min-h-screen pb-24">
      <Header />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Search />
      </main>
      <MusicPlayer />
    </div>
  );
};

export default SearchPage;
