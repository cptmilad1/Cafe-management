import React from 'react';
import { useRef } from 'react';
import { useFadeIn } from '../../shared/hooks/useGSAP';
import GlassCard from '../../shared/components/ui/GlassCard';

export default function Tables() {
  const ref = useRef();
  useFadeIn(ref, { duration: 0.8 });

  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-3xl font-bold">مدیریت میزها</h2>
      <GlassCard>
        <div className="grid md:grid-cols-4 gap-4 p-4">
          {tables.map((n) => (
            <div
              key={n}
              className="aspect-square rounded-2xl bg-white/10 border border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/20 transition"
            >
              <span className="text-xl">🪑</span>
              <span className="font-bold text-white">میز {n}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
