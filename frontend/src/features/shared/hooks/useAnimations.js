import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const staggerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'power3.out', staggerChildren: 0.1 },
  },
};

export function useStaggerRef(options = {}) {
  const { duration = 0.5, stagger = 0.08, delay = 0 } = options;
  const containerRef = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 25,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      });
    }, containerRef.current);
    return () => ctx.revert();
  }, [duration, stagger, delay]);
  return containerRef;
}
