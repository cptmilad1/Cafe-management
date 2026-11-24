import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransition({ children, className = '' }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'opacity,y',
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`animate-fade-in ${className}`}>
      {children}
    </div>
  );
}
