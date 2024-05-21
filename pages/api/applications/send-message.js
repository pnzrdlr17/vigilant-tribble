import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { session, applicationId, message, timestamp } = req.body;

  if (!applicationId || !message || !timestamp) {
    return res.status(422).json({ message: 'Invalid input' });
  }

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated!' });
  }

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: session.user.email });

  if (!user) {
    res.status(402).json({ message: 'Not allowed' });
    client.close();
    return;
  }

  const applicationsCollection = client.db().collection('applications');
  const mongoApplicationId = new ObjectId(applicationId);
  const application = await applicationsCollection.findOne({
    _id: mongoApplicationId,
  });

  if (!application) {
    client.close();
    return res.status(402).json({ message: 'Not Found' });
  }

  if (
    application.studentEmail !== user.email &&
    application.recruiterEmail !== user.email &&
    session.user.role !== 'admin'
  ) {
    client.close();
    return res.status(402).json({ message: 'Not allowed' });
  }

  const result = await applicationsCollection.updateOne(
    { _id: mongoApplicationId },
    {
      $push: {
        chat: {
          message,
          timestamp,
          sender:
            user.email === application.studentEmail
              ? 'Applicant'
              : session.user.role === 'admin'
              ? 'Admin'
              : 'Recruiter',
        },
      },
    }
  );

  client.close();
  return res.status(201).json({ message: 'Message sent successfully!' });
}

export default handler;
