'use client';

import { gsap, initScrollTrigger, isReducedMotion } from './scrollTriggerInit';

export const createParallaxEffect = (
  element: HTMLElement | null,
  speed: number = 0.3, 
  options?: {
    start?: string;
    end?: string;
  }
) => {
  if (!element || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  if (isReducedMotion()) return () => {};

  const start = options?.start ?? 'top bottom';
  const end = options?.end ?? 'bottom top';
  const yMovement = speed * 100;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      element,
      { y: -yMovement / 2 },
      {
        y: yMovement / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub: true,
        },
      }
    );
  });

  return () => ctx.revert();
};
