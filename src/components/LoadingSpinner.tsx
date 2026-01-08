import React from 'react';
import { Music2 } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-secondary animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full gradient-bg" />
        </div>
        <Music2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
      </div>
      <p className="mt-4 text-muted-foreground">Loading music...</p>
    </div>
  );
}
