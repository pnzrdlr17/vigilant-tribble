import { connectToDatabase } from '../../../util/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { email } = req.query;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const user = await usersCollection.findOne({ email });

  if (!user) {
    res.status(404).send({ message: 'User not found' });
    client.close();
    return;
  }

  res.status(200).json(user);
  client.close();
}
