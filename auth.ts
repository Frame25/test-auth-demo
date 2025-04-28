import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import data from '@/shared/data.json';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize({ email, password }) {
        const user = data.users.find((user) => user.email === email);
        console.log('login', { email, password }, user);
        if (!user || user.password !== password) return null;
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
});
