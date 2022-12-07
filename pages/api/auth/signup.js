import { MongoClient } from 'mongodb';
import { unstable_getServerSession } from 'next-auth';

import { hash } from 'bcryptjs';

import { authOptions } from './[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  const { email, password } = req.body;
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
      const client = new MongoClient(process.env.MONGO_URI);

      await client.connect();
      const db = client.db('Next-Auth');
      const users = db.collection('users');
      const foundUser = await users.findOne({ email });

      if (foundUser) {
        client.close();
        return res
          .status(403)
          .json({ message: 'User already exists, please login.' });
      }

      await insertUser({ email, password: await hash(password, 12) });
    } else {
      await insertUser(session.user);
    }
  } catch (error) {
    console.log(error);
  }
}

async function insertUser(user) {
  const newUser = await db.collection('users').insertOne(user);

  client.close();
  return res.status(201).json({ message: 'New user created.' });
}
