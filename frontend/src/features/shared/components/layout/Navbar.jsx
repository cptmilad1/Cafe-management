import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import gsap from 'gsap';
import { Link } from 'react-router';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.glass.navbar', {
        y: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav
      className="glass navbar sticky top-4 z-50 w-[calc(100%-1.5rem)] rounded-[2rem] mx-4 p-4 border-b border-white/10 shadow-2xl"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-gradient tracking-tight"
        >
          ☕ Cafe<span className="text-cyan-400">Manage</span>
        </Link>
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            داشبورد
          </Link>
          <Link
            to="/menu"
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            منو
          </Link>
          <Link
            to="/orders"
            className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
          >
            سفارش‌ها
          </Link>
          {user ? (
            <>
              <span className="text-sm text-gray-300 hidden md:inline">
                {user.fullName || user.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-all duration-300"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
              >
                ورود
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 transition-all duration-300"
              >
                ثبت‌نام
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
