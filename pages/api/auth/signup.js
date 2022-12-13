import { MongoClient } from 'mongodb';
import { unstable_getServerSession } from 'next-auth';

import { hash } from 'bcryptjs';

import { authOptions } from './[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const { email, password } = req.body;

  const client = new MongoClient(process.env.MONGO_URI);
  await client.connect();
  const db = client.db('auth-app');
  const users = db.collection('users');

  try {
    if (!session) {
      if (!email || !email.includes('@')) {
        return res
          .status(422)
          .json({ message: 'Correct email must be provided.' });
      }
      if (!password || password.trim() < 8) {
        return res
          .status(422)
          .json({ message: 'Password should be at least 8 characyers.' });
      }
      const foundUser = await users.findOne({ email });

      if (foundUser) {
        client.close();
        return res
          .status(403)
          .json({ message: 'User already exists, please login.' });
      }

      await users.insertOne({ email, password: await hash(password, 12) });
      client.close();
      return res.status(201).json({ message: 'New user created.' });
    } else {
      await users.insertOne(session.user);
      client.close();
      return res.status(201).json({ message: 'New user created.' });
    }
  } catch (error) {
    console.log(error);
  }
}
