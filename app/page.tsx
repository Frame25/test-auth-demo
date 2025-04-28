import { redirect } from 'next/navigation';

import Button from '@/shared/ui/Button';

import { auth, signOut } from '@/auth';

const handleLogout = async () => {
  'use server';
  await signOut();
};

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20">
      <h1 className="text-2xl font-bold">Demo auth app</h1>
      {session && (
        <>
          <h2>You have logged in as: {session?.user?.name}</h2>
          <Button variant="warning" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
      {!session && (
        <Button
          onClick={async () => {
            'use server';
            redirect('/login');
          }}>
          Login
        </Button>
      )}
    </main>
  );
}
