'use client';

import { gsap, initScrollTrigger, isReducedMotion } from './scrollTriggerInit';

export const createScrollProgress = (
  barElement: HTMLElement | null,
  targetPercentage: number,
  options?: {
    duration?: number;
    delay?: number;
  }
) => {
  if (!barElement || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  if (isReducedMotion()) {
    barElement.style.width = `${targetPercentage}%`;
    return () => {};
  }

  const duration = options?.duration ?? 0.9;
  const delay = options?.delay ?? 0.1;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      barElement,
      { width: '0%' },
      {
        width: `${targetPercentage}%`,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: barElement,
          start: 'top 92%',
          once: true,
        },
      }
    );
  });

  return () => ctx.revert();
};

export const createRadialProgress = (
  circleElement: SVGCircleElement | null,
  targetPercentage: number,
  options?: {
    duration?: number;
    circumference?: number;
  }
) => {
  if (!circleElement || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  const circumference = options?.circumference ?? 283; 
  const offset = circumference - (targetPercentage / 100) * circumference;

  if (isReducedMotion()) {
    circleElement.style.strokeDashoffset = `${offset}`;
    return () => {};
  }

  const duration = options?.duration ?? 1.2;

  const ctx = gsap.context(() => {
    gsap.fromTo(
      circleElement,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: offset,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: circleElement,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  return () => ctx.revert();
};
