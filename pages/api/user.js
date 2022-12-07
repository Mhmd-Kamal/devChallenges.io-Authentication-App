import { MongoClient } from 'mongodb';
import { unstable_getServerSession } from 'next-auth';
import { hash } from 'bcryptjs';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session)
    res.status(401).json({ message: 'Unauthorized, access denied!' });

  const client = new MongoClient(process.env.MONGO_URI);

  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('Next-Auth');
      const users = db.collection('users');

      const user = await users.findOne({
        email: session.user.email,
      });

      // const { password, ...rest } = user;
      delete user.password;

      client.close();
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ message: 'uh-oh, error happened!' });
      console.log(error);
    }
  }

  if (req.method === 'PUT') {
    const { newUser } = req.body;
    const { _id, ...newData } = newUser;

    try {
      await client.connect();
      const db = client.db('Next-Auth');
      const users = db.collection('users');

      if (!('password' in newData)) {
        const user = await users.findOne({
          email: newData.email,
        });

        const result = await users.replaceOne(
          { email: newData.email },
          { ...newData, password: user.password }
        );
      } else {
        const { password, ...rest } = newData;
        const hashedPassword = await hash(password, 12);

        const result = await users.replaceOne(
          { email: newData.email },
          { ...rest, password: hashedPassword }
        );
      }

      res.status(201).json({ message: 'User data updated.' });
    } catch (error) {
      res.status(500).json({ message: 'uh-oh, error happened!' });
      console.log(error);
    }
  }
}
