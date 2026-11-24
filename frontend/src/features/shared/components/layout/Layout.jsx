import { Outlet } from 'react-router';
import Navbar from './Navbar';
import { useEffect } from 'react';
import gsap from 'gsap';

export default function Layout() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('body', { overflow: 'auto', duration: 0.4 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="radial-mesh absolute inset-0 z-[-1]" />
      <Navbar />
      <main className="flex-1 w-full pt-4 pb-16 px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}
