'use client';

import { gsap, isReducedMotion } from './scrollTriggerInit';

export const animatePageEnter = (container: HTMLElement | null, onComplete?: () => void) => {
  if (!container) return;

  if (isReducedMotion()) {
    gsap.set(container, { opacity: 1, y: 0 });
    if (onComplete) onComplete();
    return;
  }

  gsap.fromTo(
    container,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'transform',
      onComplete,
    }
  );
};
