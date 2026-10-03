'use client';

export * from './scrollTriggerInit';
export * from './page';
export * from './reveal';
export * from './counter';
export * from './progress';
export * from './timeline';
export * from './parallax';
export * from './interaction';

export const animateStaggerChildren = (container: HTMLElement | null, childSelector: string) => {
  if (!container) return;
  const elements = container.querySelectorAll(childSelector);
  if (!elements.length) return;

  import('./scrollTriggerInit').then(({ gsap, isReducedMotion }) => {
    if (isReducedMotion()) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      elements,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
    );
  });
};
