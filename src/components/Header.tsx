import React from 'react';
import { useUser } from '@/context/UserContext';
import { Music2, Search, Home, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const { userName, logout } = useUser();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:glow transition-all">
              <Music2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold hidden sm:block">
              <span className="gradient-text">Flow</span>
              <span className="text-foreground">Music</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Home</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === '/search'
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Search</span>
            </Link>
          </nav>

          {/* User */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Hi, <span className="text-foreground font-medium">{userName}</span>
            </span>
            <button
              onClick={logout}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
