import { MongoClient } from 'mongodb';
import { unstable_getServerSession } from 'next-auth';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session)
      res.status(401).json({ message: 'Unauthorized, access denied!' });

    const client = new MongoClient(process.env.MONGO_URI);

    try {
      await client.connect();
      const db = client.db('Next-Auth');
      const users = db.collection('users');

      const user = await users.findOne({
        email: session.user.email,
      });

      const { password, ...rest } = user;

      client.close();
      res.status(201).json({ user: rest });
    } catch (error) {
      console.log(error);
    }
  }
}
