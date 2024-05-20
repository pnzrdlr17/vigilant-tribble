import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  const { session, applicationId, message, timestamp } = req.body;

  if (!applicationId || !message || !timestamp) {
    res.status(422).json({ message: 'Invalid input' });
    return;
  }

  if (!session) {
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

  const applicationsCollection = client.db().collection('applications');
  const mongoApplicationId = new ObjectId(applicationId);
  const application = await applicationsCollection.findOne({
    _id: mongoApplicationId,
  });

  if (!application) {
    res.status(402).json({ message: 'Not Found' });
    client.close();
    return;
  }

  if (
    application.studentEmail !== user.email &&
    application.recruiterEmail !== user.email &&
    session.user.role !== 'admin'
  ) {
    res.status(402).json({ message: 'Not allowed' });
    client.close();
    return;
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

  res.status(201).json({ message: 'Message sent successfully!' });

  client.close();
}

export default handler;
