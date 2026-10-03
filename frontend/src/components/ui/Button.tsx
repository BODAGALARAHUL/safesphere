import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'critical' | 'safe' | 'secondary' | 'outline' | 'ghost';
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
    primary: 'bg-[#38a8ff] hover:bg-[#2b8edd] text-white font-bold shadow-sm',
    critical: 'bg-[#ff304f] hover:bg-[#e02441] text-white font-black shadow-md active:scale-[0.98]',
    safe: 'bg-[#16c784] hover:bg-[#12a970] text-white font-bold shadow-sm',
    secondary: 'bg-[#18212d] hover:bg-[#202b3a] text-[#f8fafc] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] font-semibold',
    outline: 'bg-transparent hover:bg-[#18212d] text-[#f8fafc] border border-[rgba(255,255,255,0.12)] font-semibold',
    ghost: 'bg-transparent hover:bg-[#18212d] text-[#aab7c7] hover:text-[#f8fafc]',
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
