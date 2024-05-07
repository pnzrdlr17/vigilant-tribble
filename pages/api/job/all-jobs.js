import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  const client = await connectToDatabase();

  const jobsCollection = client.db().collection('jobs');
  const jobs = await jobsCollection.find({}).toArray();

  res
    .status(200)
    .json({ message: 'Jobs fetched successfully!', data: jobs || [] });

  client.close();
}

export default handler;
