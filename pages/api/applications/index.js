import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return;
  }

  const client = await connectToDatabase();

  const applicationsCollection = client.db().collection('applications');
  const applications = await applicationsCollection.find({}).toArray();

  res
    .status(200)
    .json({ message: 'Jobs fetched successfully!', data: applications || [] });

  client.close();
}

export default handler;
