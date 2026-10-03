'use client';

import React from 'react';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  return <div className="w-full min-h-[calc(100vh-4rem)]">{children}</div>;
};
