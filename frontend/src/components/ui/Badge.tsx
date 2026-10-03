import React from 'react';

interface BadgeProps {
  variant?: 'critical' | 'high' | 'moderate' | 'safe' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  pulse?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  pulse = false,
  className = '',
  children,
}) => {
  const variantStyles = {
    critical: 'bg-[rgba(255,48,79,0.12)] text-[#ff304f] border-[rgba(255,48,79,0.3)]',
    high: 'bg-[rgba(255,138,31,0.12)] text-[#ff8a1f] border-[rgba(255,138,31,0.3)]',
    moderate: 'bg-[rgba(245,197,66,0.12)] text-[#f5c542] border-[rgba(245,197,66,0.3)]',
    safe: 'bg-[rgba(22,199,132,0.12)] text-[#16c784] border-[rgba(22,199,132,0.3)]',
    info: 'bg-[rgba(56,168,255,0.12)] text-[#38a8ff] border-[rgba(56,168,255,0.3)]',
    neutral: 'bg-[#18212d] text-[#aab7c7] border-[rgba(255,255,255,0.08)]',
  }[variant];

  const dotColors = {
    critical: 'bg-[#ff304f]',
    high: 'bg-[#ff8a1f]',
    moderate: 'bg-[#f5c542]',
    safe: 'bg-[#16c784]',
    info: 'bg-[#38a8ff]',
    neutral: 'bg-[#aab7c7]',
  }[variant];

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] font-bold tracking-wider',
    md: 'px-2.5 py-1 text-xs font-bold tracking-wide',
    lg: 'px-3 py-1.5 text-xs sm:text-sm font-black tracking-wide',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${variantStyles} ${sizeStyles} uppercase select-none ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full ${dotColors} ${
            pulse ? 'animate-pulse' : ''
          }`}
        />
      )}
      {children}
    </span>
  );
};
