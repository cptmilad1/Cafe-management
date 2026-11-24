import React from 'react';
import { useRef } from 'react';
import { useFadeIn } from '../../shared/hooks/useGSAP';
import GlassCard from '../../shared/components/ui/GlassCard';

export default function Menu() {
  const ref = useRef();
  useFadeIn(ref, { duration: 0.8 });

  const items = [
    { name: 'کاپوچینو', price: '45,000 تومان', category: 'نوشیدار' },
    { name: 'لاته', price: '50,000 تومان', category: 'نوشیدار' },
    { name: 'ساندویچ کلوب', price: '85,000 تومان', category: 'غذا' },
    { name: 'پستا', price: '95,000 تومان', category: 'غذا' },
    { name: 'کیک شکلاتی', price: '65,000 تومان', category: 'دسر' },
  ];

  return (
    <div ref={ref} className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-1">منو</h2>
          <p className="text-gray-400">لیست غذاها و نوشیدگان</p>
        </div>
      </div>
      <GlassCard className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5"
          >
            <div>
              <span className="font-bold text-white">{item.name}</span>
              <span className="ml-2 text-xs text-cyan-300">{item.category}</span>
            </div>
            <span className="font-mono text-green-400">{item.price}</span>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}
