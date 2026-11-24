import { useEffect } from 'react';
import gsap from 'gsap';

export function useGSAP(ref, animation, deps = []) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      animation(gsap, ref.current);
    }, ref.current);
    return () => ctx.revert();
  }, deps);
}

export function useFadeIn(ref, options = {}) {
  const { duration = 0.8, delay = 0, y = 30 } = options;
  useGSAP(
    ref,
    (gsap, node) => {
      gsap.from(node, { duration, delay, y, opacity: 0, ease: 'power3.out' });
    },
    []
  );
}
