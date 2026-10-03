'use client';

import { gsap, ScrollTrigger, initScrollTrigger, isReducedMotion } from './scrollTriggerInit';

export const createScrollCounter = (
  element: HTMLElement | null,
  targetValue: number,
  options?: {
    suffix?: string;
    prefix?: string;
    duration?: number;
    decimals?: number;
  }
) => {
  if (!element || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  const suffix = options?.suffix ?? '';
  const prefix = options?.prefix ?? '';
  const duration = options?.duration ?? 1.2;
  const decimals = options?.decimals ?? 0;

  if (isReducedMotion()) {
    element.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
    return () => {};
  }

  const tracker = { val: 0 };

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(tracker, {
          val: targetValue,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = decimals > 0 ? tracker.val.toFixed(decimals) : Math.round(tracker.val).toString();
            element.textContent = `${prefix}${formatted}${suffix}`;
          },
        });
      },
    });
  });

  return () => ctx.revert();
};

export const animateNumberCount = (element: HTMLElement | null, targetValue: number, suffix: string = '') => {
  if (!element) return;
  if (isReducedMotion()) {
    element.textContent = `${targetValue}${suffix}`;
    return;
  }

  const tracker = { val: 0 };
  gsap.to(tracker, {
    val: targetValue,
    duration: 1.0,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = `${Math.round(tracker.val)}${suffix}`;
    },
  });
};
