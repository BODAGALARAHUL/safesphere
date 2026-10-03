'use client';

import { gsap, isReducedMotion } from './scrollTriggerInit';

export const setupMagneticHover = (buttonElement: HTMLElement | null, strength: number = 0.25) => {
  if (!buttonElement || typeof window === 'undefined') return () => {};
  if (isReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return () => {};

  const onMouseMove = (e: MouseEvent) => {
    const rect = buttonElement.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(buttonElement, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(buttonElement, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  buttonElement.addEventListener('mousemove', onMouseMove);
  buttonElement.addEventListener('mouseleave', onMouseLeave);

  return () => {
    buttonElement.removeEventListener('mousemove', onMouseMove);
    buttonElement.removeEventListener('mouseleave', onMouseLeave);
  };
};

export const animateEmergencyPulse = (element: HTMLElement | null) => {
  if (!element || typeof window === 'undefined') return () => {};
  if (isReducedMotion()) return () => {};

  const tween = gsap.to(element, {
    scale: 1.025,
    boxShadow: '0 0 24px rgba(244, 63, 94, 0.45)',
    duration: 1.4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });

  return () => tween.kill();
};
