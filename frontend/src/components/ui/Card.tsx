'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'critical' | 'high-risk' | 'warning' | 'safe';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-[#0d121a] border border-[#243646]/80',
    elevated: 'bg-[#101c27] border border-[#243646] hover:bg-[#162532] hover:border-[#355066]',
    critical: 'bg-[#0d121a] border border-[#f43f5e]/40 border-l-4 border-l-[#f43f5e]',
    'high-risk': 'bg-[#0d121a] border border-[#f97316]/40 border-l-4 border-l-[#f97316]',
    warning: 'bg-[#0d121a] border border-[#f59e0b]/40 border-l-4 border-l-[#f59e0b]',
    safe: 'bg-[#0d121a] border border-[#10b981]/40 border-l-4 border-l-[#10b981]',
  }[variant];

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 transition-all shadow-sm ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
