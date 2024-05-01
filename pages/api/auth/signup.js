import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  //error handling implement
  const data = req.body;

  const { name, email, password, role } = data;

  //check data...

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');

  const existingUser = await usersCollection.findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User already exists!' });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await usersCollection.insertOne({
    email: email,
    name: name,
    password: hashedPassword,
    role: role,
  });

  res.status(201).json({ message: 'Created user successfully!', data: result });
  client.close();
}

export default handler;
