'use client';

import { gsap, initScrollTrigger, isReducedMotion } from './scrollTriggerInit';

export const createScrollReveal = (
  element: HTMLElement | null,
  options?: {
    yOffset?: number;
    duration?: number;
    delay?: number;
    startTrigger?: string;
  }
) => {
  if (!element || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  if (isReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return () => {};
  }

  const y = options?.yOffset ?? 32;
  const duration = options?.duration ?? 0.6;
  const delay = options?.delay ?? 0;
  const start = options?.startTrigger ?? 'top 88%';

  const ctx = gsap.context(() => {
    gsap.fromTo(
      element,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start,
          once: true,
        },
      }
    );
  });

  return () => ctx.revert();
};

export const createStaggerReveal = (
  container: HTMLElement | null,
  childSelector: string,
  options?: {
    yOffset?: number;
    duration?: number;
    stagger?: number;
    startTrigger?: string;
  }
) => {
  if (!container || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  const elements = container.querySelectorAll(childSelector);
  if (!elements.length) return () => {};

  if (isReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return () => {};
  }

  const y = options?.yOffset ?? 24;
  const duration = options?.duration ?? 0.5;
  const stagger = options?.stagger ?? 0.08;
  const start = options?.startTrigger ?? 'top 85%';

  const ctx = gsap.context(() => {
    gsap.fromTo(
      elements,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      }
    );
  });

  return () => ctx.revert();
};
