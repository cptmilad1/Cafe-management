import React from 'react';
import { useFadeIn } from '../../shared/hooks/useGSAP';
import GlassCard from '../../shared/components/ui/GlassCard';
import { useRef } from 'react';

export default function Home() {
  const heroRef = useRef();
  useFadeIn(heroRef, { duration: 1, y: 40 });

  return (
    <div className="space-y-8">
      <div ref={heroRef} className="glass p-12 text-center rounded-[3rem]">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient tracking-tight">
          خوش آمدید به کافه مدیریت
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          سیستم پیشرفته مدیریت سفارش، منو و میز با انیمیشن‌های GSAP و تم لیکوئید گلاس.
        </p>
      </div>
      <GlassCard className="grid md:grid-cols-3 gap-6">
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">☕</div>
          <h3 className="font-bold text-white mb-1">منوی متنوع</h3>
          <p className="text-sm text-gray-400">ماشروبات و غذاهای با کیفیت</p>
        </div>
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">📋</div>
          <h3 className="font-bold text-white mb-1">سفارش آنلاین</h3>
          <p className="text-sm text-gray-400">ثبت سفارش به صورت لحظه‌ای</p>
        </div>
        <div className="p-4 text-center">
          <div className="text-4xl mb-2">🪑</div>
          <h3 className="font-bold text-white mb-1">مدیریت میزها</h3>
          <p className="text-sm text-gray-400">پایش وضعیت میزها در زمان واقعی</p>
        </div>
      </GlassCard>
    </div>
  );
}
