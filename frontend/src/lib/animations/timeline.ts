'use client';

import { gsap, initScrollTrigger, isReducedMotion } from './scrollTriggerInit';

export const createTimelineLineAnimation = (
  lineElement: HTMLElement | null,
  options?: {
    start?: string;
    end?: string;
  }
) => {
  if (!lineElement || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  if (isReducedMotion()) {
    lineElement.style.transform = 'scaleY(1)';
    return () => {};
  }

  const start = options?.start ?? 'top 80%';
  const end = options?.end ?? 'bottom 70%';

  const ctx = gsap.context(() => {
    gsap.fromTo(
      lineElement,
      { scaleY: 0, transformOrigin: 'top center' },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: lineElement,
          start,
          end,
          scrub: 0.5,
        },
      }
    );
  });

  return () => ctx.revert();
};

export const createTimelineNodeReveal = (
  container: HTMLElement | null,
  nodeSelector: string
) => {
  if (!container || typeof window === 'undefined') return () => {};
  initScrollTrigger();

  const nodes = container.querySelectorAll(nodeSelector);
  if (!nodes.length) return () => {};

  if (isReducedMotion()) {
    gsap.set(nodes, { opacity: 1, x: 0 });
    return () => {};
  }

  const ctx = gsap.context(() => {
    nodes.forEach((node, idx) => {
      const fromLeft = idx % 2 === 0;
      gsap.fromTo(
        node,
        { opacity: 0, x: fromLeft ? -20 : 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });
  });

  return () => ctx.revert();
};
