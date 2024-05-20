import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { type, title, text, link, isSystemGenerated, session } = req.body;

  if (!session || session.user.role !== 'recruiter') {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: session.user.email });
  if (!user || user.role !== 'recruiter') {
    res.status(402).json({ message: 'Not allowed' });
    client.close();
    return;
  }
  const updateResult = await usersCollection.updateMany(
    { role: 'student' },
    {
      $push: {
        inbox: {
          $each: [
            {
              type,
              title,
              text,
              link,
              isSystemGenerated,
              status: 'unread',
              timestamp: new Date().toISOString(),
            },
          ],
        },
      },
    }
  );

  res
    .status(201)
    .json({ message: 'Notifications sent successfully!', data: updateResult });
  client.close();
}

export default handler;
