import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../util/auth';
import { connectToDatabase } from '../../../util/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      return Promise.resolve(session);
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return Promise.resolve(token);
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Password incorrect!');
        }

        client.close();

        return {
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
