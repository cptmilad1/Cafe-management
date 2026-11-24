import React from 'react';
import GlassCard from '../../shared/components/ui/GlassCard';
import { useRef } from 'react';
import { useFadeIn } from '../../shared/hooks/useGSAP';

export default function Dashboard() {
  const ref = useRef();
  useFadeIn(ref, { duration: 0.8 });

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-1">داشبورد</h2>
          <p className="text-gray-400">نمای کلی از عملکرد کافه</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="text-3xl font-bold text-cyan-400">124</div>
          <div className="text-sm text-gray-400">سفارش امروز</div>
        </GlassCard>
        <GlassCard>
          <div className="text-3xl font-bold text-green-400">4.2M</div>
          <div className="text-sm text-gray-400">درآمد کل</div>
        </GlassCard>
        <GlassCard>
          <div className="text-3xl font-bold text-purple-400">18</div>
          <div className="text-sm text-gray-400">میز فعال</div>
        </GlassCard>
      </div>
    </div>
  );
}
