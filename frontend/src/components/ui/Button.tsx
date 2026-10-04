'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'critical' | 'safe' | 'secondary' | 'outline' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#22d3ee] hover:bg-[#06b6d4] text-[#071018] font-bold shadow-sm active:scale-[0.98]',
    critical: 'bg-[#f43f5e] hover:bg-[#e11d48] text-white font-black shadow-md active:scale-[0.98]',
    emergency: 'bg-[#f43f5e] hover:bg-[#e11d48] text-white font-black shadow-lg shadow-[#f43f5e]/25 active:scale-[0.98]',
    safe: 'bg-[#10b981] hover:bg-[#059669] text-white font-bold shadow-sm active:scale-[0.98]',
    secondary: 'bg-[#101c27] hover:bg-[#162532] text-[#f4f8fb] border border-[#243646] hover:border-[#355066] font-semibold',
    outline: 'bg-transparent hover:bg-[#101c27] text-[#f4f8fb] border border-[#243646] font-semibold',
    ghost: 'bg-transparent hover:bg-[#101c27] text-[#b3c2d0] hover:text-[#f4f8fb]',
  }[variant];

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs rounded-lg min-h-[36px]',
    md: 'px-4 py-2.5 text-xs sm:text-sm rounded-xl min-h-[44px]',
    lg: 'px-5 py-3 text-sm sm:text-base rounded-xl min-h-[48px]',
    xl: 'px-6 py-4 text-base sm:text-lg rounded-2xl min-h-[56px] font-black',
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 transition-all cursor-pointer select-none focus-command disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : null}
      {children}
    </button>
  );
};
