import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../shared/store/useAuthStore';
import GlassCard from '../../shared/components/ui/GlassCard';
import { Link } from 'react-router';

const loginSchema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(6, 'رمز عبور حداقل ۶ کاراکتر'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { login, loading } = useAuthStore();

  const onSubmit = async (data) => {
    const res = await login(data);
    if (!res.success) console.error(res.error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <GlassCard className="w-full max-w-md p-8 hover:false">
        <h2 className="text-2xl font-bold text-center mb-6 text-gradient">
          ورود به حساب
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              ایمیل
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              رمز عبور
            </label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 disabled:opacity-60 transition-all duration-300"
          >
            {loading ? 'در حال ورود...' : 'ورود'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          حساب ندارید؟{' '}
          <Link to="/signup" className="text-cyan-400 hover:underline">
            ثبت‌نام کنید
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
