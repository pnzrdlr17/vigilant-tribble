import { connectToDatabase } from '../../../util/db';

async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { receiverEmail } = req.query;

  const { type, title, text, link, isSystemGenerated, session } = req.body;

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  const client = await connectToDatabase();

  const usersCollection = client.db().collection('users');
  const sender = await usersCollection.findOne({ email: session.user.email });
  if (!sender) {
    res.status(404).json({ message: 'User not found!' });
    return;
  }

  const updateResult = await usersCollection.updateOne(
    { email: receiverEmail },
    {
      $push: {
        inbox: {
          $each: [
            {
              type,
              senderId: sender._id,
              senderEmail: sender.email,
              senderName: sender.name,
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
