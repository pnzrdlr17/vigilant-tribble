import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const {
    title,
    company,
    description,
    location,
    requirements,
    domain,
    session,
  } = req.body;

  if (!session || session.user.role !== 'recruiter') {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: session.user.email });
  if (!user) {
    res.status(402).json({ message: 'Not allowed' });
    client.close();
    return;
  }

  const jobsCollection = client.db().collection('jobs');

  const result = await jobsCollection.insertOne({
    title,
    company,
    description,
    location,
    requirements,
    domain,
    jobOwner: session.user.email,
    applications: [],
    status: 'active',
    timestamp: new Date().toISOString(),
  });

  res.status(201).json({ message: 'Job created successfully!', data: result });
  client.close();
}

export default handler;
