import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../util/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' });
    return;
  }

  const { jobId } = req.query;

  const client = await connectToDatabase();
  const jobsCollection = client.db().collection('jobs');
  const mongoJobId = new ObjectId(jobId);
  const job = await jobsCollection.findOne({ _id: mongoJobId });

  if (!job) {
    res.status(404).send({ message: 'Job not found' });
    client.close();
    return;
  }

  res.status(200).json(job);
  client.close();
}
