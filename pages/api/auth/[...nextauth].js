import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import Credentials from 'next-auth/providers/credentials';
import { MongoClient } from 'mongodb';
import { compare } from 'bcryptjs';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = new MongoClient(process.env.MONGO_URI);

        await client.connect();

        const db = client.db('Next-Auth');
        const users = db.collection('users');

        const user = await users.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error('User with this email does not exist!');
        }

        const passwordCheck = await compare(
          credentials.password,
          user.password
        );
        if (!passwordCheck) {
          client.close();
          throw new Error('Wrong Password, try again!');
        }

        client.close();
        return { email: user.email };
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
