import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Music2, Headphones, Radio } from 'lucide-react';

export function WelcomeScreen() {
  const [name, setName] = useState('');
  const { setUserName } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full gradient-bg opacity-20 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent opacity-15 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-muted opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-muted opacity-10" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="text-center mb-12 animate-fade-in">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-bg mb-6 glow animate-pulse-glow">
            <Music2 className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            <span className="gradient-text">Flow</span>
            <span className="text-foreground">Music</span>
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Discover millions of free tracks
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-2xl p-8">
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              What should we call you?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-4 bg-secondary/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg"
              autoFocus
            />
            
            <button
              type="submit"
              disabled={!name.trim()}
              className="w-full mt-6 py-4 px-6 gradient-bg text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed glow text-lg"
            >
              Start Listening
            </button>
          </div>
        </form>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-3">
              <Headphones className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Free Music</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-3">
              <Music2 className="w-6 h-6 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground">No Ads</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary mb-3">
              <Radio className="w-6 h-6 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Trending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
