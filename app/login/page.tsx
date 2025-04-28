import { redirect } from 'next/navigation';

import { LoginForm } from '@/shared/ui/Login';

import { auth, signIn } from '@/auth';

const handleLogin = async (values: any) => {
  'use server';
  await signIn('credentials', {
    email: values.email,
    password: values.password,
    redirectTo: '/',
  });
};

export const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20">
      <LoginForm className="w-80" onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
