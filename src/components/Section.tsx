import React from 'react';

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section className={`mb-10 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
