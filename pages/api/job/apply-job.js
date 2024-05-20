import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { jobId, studentId, studentName, studentEmail } = req.body;

  if (!jobId || !studentId || !studentName || !studentEmail) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }

  const client = await connectToDatabase();

  const applicationsCollection = client.db().collection('applications');

  const result = await applicationsCollection.insertOne({
    jobId,
    studentId,
    studentName,
    studentEmail,
    status: 'Under Review',
    chat: [
      {
        sender: 'Recruiter',
        message: 'Application submitted successfully!',
        timestamp: new Date().toISOString(),
      },
    ],
    timestamp: new Date().toISOString(),
  });

  res
    .status(201)
    .json({ message: 'Application created successfully!', data: result });
  client.close();
}

export default handler;
