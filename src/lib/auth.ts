import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from './prisma';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { usePostQuery } from '@/services';

const ROOT_URL = process.env.NEXT_PUBLIC_DATA_SOURCE_URL;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const signInData = {
          email: credentials.email,
          password: credentials.password,
        };

        const response: any = await axios.post<{
          data: {
            email: string;
            password: string;
          };
        }>(ROOT_URL + 'sign-in', signInData);

        return response.data.data;

        // return data;

        // const existingUser = await prisma.user.findUnique({
        //   where: {
        //     email: credentials?.email,
        //   },
        // });

        // if (!existingUser) {
        //   return null;
        // }

        // const passwordMatch = await compare(
        //   credentials.password,
        //   existingUser.password
        // );

        // if (!passwordMatch) {
        //   return null;
        // }

        // return {
        //   id: existingUser.id,
        //   email: existingUser.email,
        // };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        return {
          ...token,
          email: user.email,
        };
      }
      return token;
    },

    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          email: token.email,
        },
      };
    },
  },
};
