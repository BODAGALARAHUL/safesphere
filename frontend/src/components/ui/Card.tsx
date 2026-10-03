import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'surface-1' | 'surface-2' | 'surface-3' | 'critical' | 'safe';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'surface-1',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    'surface-1': 'bg-[#0d1424] border border-[#24324a]',
    'surface-2': 'bg-[#131d31] border border-[#24324a]',
    'surface-3': 'bg-[#1a263e] border border-[#24324a]',
    critical: 'bg-[#1e1014] border border-[#7f1d1d]',
    safe: 'bg-[#0a1813] border border-[#064e3b]',
  }[variant];

  return (
    <div
      className={`rounded-xl p-4 sm:p-5 transition-colors ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
