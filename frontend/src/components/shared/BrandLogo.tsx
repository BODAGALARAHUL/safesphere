'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'full' | 'emblem' | 'compact';
  href?: string;
  className?: string;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  href = '/',
  className = '',
  priority = false,
}) => {
  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {variant === 'full' ? (
        <>
          {/* Desktop Full Brandmark Logo */}
          <div className="hidden sm:flex items-center h-11 w-auto">
            <Image
              src="/safesphere-logo.png"
              alt="SafeSphere - Civic Disaster Safety Platform"
              width={886}
              height={248}
              priority={priority}
              className="h-10 lg:h-11 w-auto max-w-[190px] lg:max-w-[240px] object-contain select-none drop-shadow-[0_0_14px_rgba(34,211,238,0.25)]"
            />
          </div>

          {/* Mobile Emblem */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101c27] border border-[#243646] p-1 shadow-md shrink-0">
              <Image
                src="/safesphere-emblem-v2.png"
                alt="SafeSphere Emblem"
                width={262}
                height={232}
                priority={priority}
                className="h-full w-full object-contain select-none drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
              />
            </div>
            <span className="font-black text-base text-white tracking-tight leading-none">
              Safe<span className="text-[#22d3ee]">Sphere</span>
            </span>
          </div>
        </>
      ) : variant === 'emblem' ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#101c27] border border-[#243646] p-1 shadow-md shrink-0">
          <Image
            src="/safesphere-emblem-v2.png"
            alt="SafeSphere"
            width={262}
            height={232}
            priority={priority}
            className="h-full w-full object-contain select-none drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
          />
        </div>
      ) : (
        /* Compact Logo + Wordmark */
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#101c27] border border-[#243646] p-1 shrink-0">
            <Image
              src="/safesphere-emblem-v2.png"
              alt="SafeSphere"
              width={262}
              height={232}
              priority={priority}
              className="h-full w-full object-contain select-none"
            />
          </div>
          <span className="font-black text-sm text-white tracking-tight">
            Safe<span className="text-[#22d3ee]">Sphere</span>
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-command rounded-xl inline-block" aria-label="SafeSphere Homepage">
        {content}
      </Link>
    );
  }

  return content;
};
