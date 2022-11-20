import { MongoClient } from 'mongodb';
import { hash } from 'bcryptjs';
export default async function handler(req, res) {
  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(422).json({ message: 'Correct email must be provided.' });
  }

  if (!password || password.trim() < 8) {
    return res
      .status(422)
      .json({ message: 'Password should be at least 8 characyers.' });
  }

  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db('Next-Auth');
    const users = db.collection('users');

    const user = await users.findOne({ email });

    if (user) {
      client.close();
      return res
        .status(403)
        .json({ message: 'User already exists, please login.' });
    }

    const newUser = await db
      .collection('users')
      .insertOne({ email, password: await hash(password, 12) });

    client.close();
    res.status(201).json({ message: 'New user created.' });
  } catch (error) {
    console.log(error);
  }
}
