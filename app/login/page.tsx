'use client';

import { signIn } from 'next-auth/react';

import { LoginForm } from '@/shared/ui/Login';

const handleLogin = async (values: any) => {
  try {
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (!result?.ok || result?.error) {
      return { error: 'Invalid credentials' };
    }

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An unexpected error occurred', success: false };
  }
};

export default function LoginPage() {
  return (
    <div
      aria-labelledby="login-title"
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20">
      <h1 className="text-2xl font-bold" id="login-title">
        Login
      </h1>
      <LoginForm className="w-80" onLogin={handleLogin} />
    </div>
  );
}
