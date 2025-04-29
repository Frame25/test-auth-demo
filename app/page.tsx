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
    <main
      aria-labelledby="page-title"
      className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20">
      <h1 className="text-2xl font-bold" id="page-title">
        Demo auth app
      </h1>
      {session && (
        <>
          <h2>
            You have logged in as:{' '}
            <span aria-label="User name" id="user-name">
              {session?.user?.name}
            </span>
          </h2>
          <Button aria-label="Logout user" variant="warning" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
      {!session && (
        <Button
          aria-label="Go to login page"
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
