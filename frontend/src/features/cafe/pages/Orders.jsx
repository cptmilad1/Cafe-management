import React from 'react';
import { useRef } from 'react';
import { useFadeIn } from '../../shared/hooks/useGSAP';
import GlassCard from '../../shared/components/ui/GlassCard';

export default function Orders() {
  const ref = useRef();
  useFadeIn(ref, { duration: 0.8 });

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-3xl font-bold">سفارش‌ها</h2>
      <GlassCard>
        <div className="text-center py-12 text-gray-400">
          <div className="text-2xl mb-2">📋</div>
          scaffolds سفارشی در حال بارگذاری از طریق سوکت...
        </div>
      </GlassCard>
    </div>
  );
}
