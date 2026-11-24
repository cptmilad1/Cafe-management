import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GlassCard({ children, className = '', hover = true }) {
  const ref = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    }, ref.current);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        hover ? 'glass-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
